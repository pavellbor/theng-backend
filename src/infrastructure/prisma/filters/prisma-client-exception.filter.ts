import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception);

    const message = exception.meta!.cause;
    const exceptionMap = {
      P2000: BadRequestException,
      P2002: ConflictException,
      P2025: NotFoundException,
    };

    if (exception.code in exceptionMap) {
      throw new exceptionMap[exception.code](message);
    }

    super.catch(exception, host);
  }
}
