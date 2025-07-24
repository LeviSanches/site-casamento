import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IConvidado } from '../interfaces/iConvidado';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfirmarPresencaService {

  private readonly http = inject(HttpClient);

  private readonly url = environment.apiUrl;

  confirmarPresenca(data: IConvidado): Observable<IConvidado> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<IConvidado>(`${this.url}/invited`, data, { headers });
  }

  notificarPresenca(mensagem: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
  })

    return this.http.post<string>(`${this.url}/invited/notify`, mensagem, { headers });
  }


}
