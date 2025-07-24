import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Constantes } from '../../../constants/Constantes';

@Component({
  selector: 'app-modal-msg-confirmacao',
  imports: [],
  templateUrl: './modal-msg-confirmacao.component.html',
  styleUrl: './modal-msg-confirmacao.component.css'
})
export class ModalMsgConfirmacaoComponent {  

  constructor(
    public dialogRef: MatDialogRef<ModalMsgConfirmacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    const newUrl = window.location.protocol + "//" + window.location.host;
    window.history.pushState({ path: newUrl }, '', newUrl);
    this.dialogRef.close();
  }

  mensagemPosConfirmacao(): string {
      let nomes = this.data.convidado.nome?.split(" ");
      return this.data.convidado.statusPresenca ?
        `${nomes?.[0]}, ${Constantes.MSG_COMPARECIMENTO_SIM}` :
        `${nomes?.[0]}, ${Constantes.MSG_COMPARECIMENTO_NAO}`;
    }
  

}
