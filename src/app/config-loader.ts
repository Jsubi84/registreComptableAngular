import { HttpClient } from '@angular/common/http';

export function ConfigLoader(http: HttpClient) {
  return () => http.get('/assets/config.json').toPromise();
}
