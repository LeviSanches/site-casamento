import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IListaPresentes } from '../interfaces/iListaPresentes';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaPresentesService {

  private url: string = environment.apiUrl;

  private readonly httpClient = inject(HttpClient);

  getProdutos(): Observable<IListaPresentes[]> {
    return this.httpClient.get<IListaPresentes[]>(`${this.url}/produto`);
  }


}
