import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IListaPresentes } from '../interfaces/iListaPresentes';

@Injectable({
  providedIn: 'root'
})
export class PagamentoServiceService {

  private readonly http = inject(HttpClient);

  private readonly url = environment.apiUrl;

  pagar(data: IListaPresentes): any {
    return this.http.post<IListaPresentes>(`${this.url}/pagamento`, data)
  }
  
}
