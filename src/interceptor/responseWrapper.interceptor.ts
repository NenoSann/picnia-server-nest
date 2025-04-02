import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface Response<T> {
  data: T | undefined;
  code: number;
  message?: string;
}

enum ResponseStatus {
  SUCCESS = 'success',
  FAIL = 'fail'
}

@Injectable()
export default class ResponseWrapperInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    content: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 200,
          status: ResponseStatus.SUCCESS,
        };
      }),
      catchError((error) => {
        if (error instanceof HttpException) {
          // 使用 of 操作符返回一个新的 Observable，而不是抛出错误
          return of({
            data: null,
            code: 200,  // 业务逻辑错误使用 200
            message: error.message,
            status: ResponseStatus.FAIL,
          });
        }
        return of({
          data: null,
          code: 500,  // 系统错误使用 500
          message: '服务器内部错误',
          status: ResponseStatus.FAIL,
        });
      }),
    );
  }
}
