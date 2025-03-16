import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  constructor(private snackBar: MatSnackBar) { }

  notificar(mensagem: string): void {
    this.snackBar.open(mensagem, 'Ok', {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }

  notificarLonga(mensagem: string): void {
    this.snackBar.open(mensagem, 'Ok', {
      duration: 15000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }
}
