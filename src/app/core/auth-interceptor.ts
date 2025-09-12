import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userToken = localStorage.getItem('aromaAtelierToken');

  if (userToken) {
    const apiReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${userToken}`),
    });
    return next(apiReq);
  }

  return next(req);
};
