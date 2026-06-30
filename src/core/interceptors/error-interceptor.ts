import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _router = inject(Router);
  const _authS = inject(AuthService);
  return next(req).pipe(
    catchError(
      (error) => {
        if (error.status === 401) {
          _authS.logout();
          _router.navigate(['/login'])
        }
        else if (error.status === 403) {
          _router.navigate(['/unauthorized'])
        }
        else if (error.status === 404) {
          _router.navigate(['/notfound'])
        }
        else {
          alert(error.error?.message || 'something went wrong, please try again')
        }
        return throwError(() => error)
      }
    )
  )

};
