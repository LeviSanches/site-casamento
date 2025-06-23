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

    return this.http.post<string>(`${this.apiUrl}/payment`, data, { headers });
  }

  salvarPagamento(data: IPagamento): Observable<string> {
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });

    return this.http.post<string>(`${this.apiUrl}/payment/save`, data, { headers });
  }

  buscarPagamento(paymentId: string | null): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'paymentId': paymentId || ''
    });

    return this.http.get<string>(`${this.apiUrl}/payment`, { headers });
  }

  buscarInformacoesConvidado(preferenceId: string | null): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'preferenceId': preferenceId || ''
    })

    return this.http.get<string>(`${this.apiUrl}/payment/invited`, {headers})
  }
}
