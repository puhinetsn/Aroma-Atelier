import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api')) {
    return next(req);
  }

  const apiReq = req.clone({
    url: req.url.replace('/api', 'http://localhost:8080/api'),
  });

  return next(apiReq);
};
