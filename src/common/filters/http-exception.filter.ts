import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  constructor() {}

  private readonly logger = new Logger(DatabaseExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const error = exception as QueryFailedError & {
      code: string;
      detail?: string;
      column?: string;
    };

    let status: number = HttpStatus.BAD_REQUEST;
    const errors: Record<string, string[]> = {};

    switch (error.code) {
      case '23505': // Unique constraint violation
        status = HttpStatus.CONFLICT;
        this.handleUniqueViolation(error, errors, request);
        break;

      case '23503': // Foreign key violation
        this.handleForeignKeyViolation(error, errors, request);
        break;

      case '23502': // Not null violation
        this.handleNotNullViolation(error, errors);
        break;

      case '22001': // String too long
        this.handleStringTooLong(error, errors);
        break;

      default: // Unexpected database error
        this.handleUnexpectedError(error, errors);
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }

    this.logger.error(
      `Database Error [${error.code}]: ${JSON.stringify(errors)}`,
      exception.stack,
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errors,
    });
  }

  private handleUniqueViolation(
    error: QueryFailedError & {
      code: string;
      detail?: string;
      column?: string;
    },
    errors: Record<string, string[]>,
    request: Request,
  ) {
    const columns = this.extractColumnsFromDetail(error.detail);

    const contextFields = ['school', 'schoolId'];

    const hasContextField = columns.some((col) => contextFields.includes(col));

    const primaryFields = columns.filter((col) => !contextFields.includes(col));

    if (hasContextField && primaryFields.length > 0) {
      for (const column of primaryFields) {
        if (!errors[column]) {
          errors[column] = [];
        }

        const translatedMessage = `Property '${this.capitalize(column)}' already exists.`;
        errors[column].push(translatedMessage);
      }
    } else {
      for (const column of columns) {
        if (!errors[column]) {
          errors[column] = [];
        }

        const translatedMessage = 'Duplicate value found.';
        errors[column].push(translatedMessage);
      }
    }
  }

  private handleForeignKeyViolation(
    error: QueryFailedError & {
      code: string;
      detail?: string;
      column?: string;
    },
    errors: Record<string, string[]>,
    request: Request,
  ) {
    const columns = this.extractColumnsFromDetail(error.detail);

    if (!columns.length) {
      columns.push('foreignKey');
    }

    for (const column of columns) {
      if (!errors[column]) {
        errors[column] = [];
      }
      const translatedMessage = `Foreign key violation on property '${this.capitalize(column)}'.`;
      errors[column].push(translatedMessage);
    }
  }

  private handleNotNullViolation(
    error: QueryFailedError & {
      code: string;
      detail?: string;
      column?: string;
    },
    errors: Record<string, string[]>,
  ) {
    const column = error.column || 'field';
    if (!errors[column]) {
      errors[column] = [];
    }
    errors[column].push('Not null violation.');
  }

  private handleStringTooLong(
    error: QueryFailedError & {
      code: string;
      detail?: string;
      column?: string;
    },
    errors: Record<string, string[]>,
  ) {
    const column = error.column || 'field';
    if (!errors[column]) {
      errors[column] = [];
    }
    errors[column].push('String too long.');
  }

  private handleUnexpectedError(
    error: QueryFailedError & {
      code: string;
      detail?: string;
      column?: string;
    },
    errors: Record<string, string[]>,
  ) {
    if (!errors['database']) {
      errors['database'] = [];
    }
    errors['database'].push('Unexpected database error.');
  }

  private extractColumnsFromDetail(detail: string | undefined): string[] {
    const columns: string[] = [];
    const match = detail?.match(/Key \(([^)]+)\)=\(/);

    if (match && match[1]) {
      const rawColumns = match[1]
        .split(',')
        .map((col: string) => col.trim().replace(/"/g, ''));
      rawColumns.forEach((col: string) => {
        if (col) {
          columns.push(col);
        }
      });
    }

    return columns.length > 0 ? columns : ['unknown'];
  }

  private capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
