import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IPagamento } from '../interfaces/iPagamento';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private readonly http = inject(HttpClient);

  private readonly url = environment.apiUrl;

  pagar(data: IPagamento): any {
    return this.http.post<IPagamento>(`${this.url}/pagamento`, data)
  }
  
}
