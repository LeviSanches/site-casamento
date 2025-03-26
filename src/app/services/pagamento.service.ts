import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IPagamento } from '../interfaces/iPagamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

  pagar(data: any): Observable<string> {
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });

    return this.http.post<string>(`${this.apiUrl}/pagamento`, data, { headers });
  }

  salvarPagamento(data: IPagamento): Observable<string> {
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });

    return this.http.post<string>(`${this.apiUrl}/pagamento/save`, data, { headers });
  }

  buscarPagamento(preferencia: string | null): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'preferenceId': preferencia || '',
    });

    return this.http.get<string>(`${this.apiUrl}/pagamento`, { headers });
  }
}
