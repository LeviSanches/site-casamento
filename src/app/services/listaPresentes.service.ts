import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IListaPresentes } from '../interfaces/iListaPresentes';

@Injectable({
  providedIn: 'root'
})
export class ListaPresentesService {

  private url: string = "http://localhost:3000/presentes";

  private readonly httpClient = inject(HttpClient);

  getProdutos(): Observable<IListaPresentes[]> {
    return this.httpClient.get<IListaPresentes[]>(this.url);
  }


}
