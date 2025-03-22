import { HttpException, HttpStatus } from '@nestjs/common';

export class OpenAIRequestException extends HttpException {
  constructor(message?: string, error?: Error) {
    super(
      message || 'OpenAI API request failed',
      HttpStatus.INTERNAL_SERVER_ERROR,
      { cause: error },
    );
  }
}

export class OpenAIJsonParseException extends HttpException {
  constructor(message?: string, error?: Error) {
    super(
      message || 'Failed to parse OpenAI JSON response',
      HttpStatus.INTERNAL_SERVER_ERROR,
      { cause: error },
    );
  }
}
