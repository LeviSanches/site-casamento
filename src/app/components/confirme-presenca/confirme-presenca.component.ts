import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotificacaoService } from '../../services/notificacao.service';
import { IConvidado } from '../../interfaces/iConvidado';
import { ConfirmarPresencaService } from '../../services/confirmarPresenca.service';
import { Constantes } from '../../constants/Constantes';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalMsgConfirmacaoComponent } from '../mod/modal-msg-confirmacao/modal-msg-confirmacao.component';
import { ScrollRestorerService } from '../../services/scrollRestorer.service';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-confirme-presenca',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    NgxMaskDirective,
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './confirme-presenca.component.html',
  styleUrl: './confirme-presenca.component.css'
})
export class ConfirmePresencaComponent {

  dialog: MatDialog = inject(MatDialog);
  private formBuilder = inject(FormBuilder);
  private notificacao = inject(NotificacaoService);
  private apiService = inject(ConfirmarPresencaService);
  private scrollService = inject(ScrollRestorerService);
  private overlay = inject(Overlay);
  
  convidado: IConvidado = {
    nome: '',
    email: '',
    statusPresenca: false,
    acompanhantes: [],
    telefone: ''
  };

  count: number = 0;
  numAcompanhantes: number[] = [];
  nomeAcompanhante: string = 'nomeAcompanhante'

  presenca = this.formBuilder.group({
    nome: ['', Validators.required],
    email: [''],
    telefone: ['', Validators.required],
    statusPresenca: ['', Validators.required],
    acompanhantes: this.formBuilder.array([
      this.formBuilder.group({ nome: ['', Validators.required] }),
      this.formBuilder.group({ nome: ['', Validators.required] }),
      this.formBuilder.group({ nome: ['', Validators.required] }),
      this.formBuilder.group({ nome: ['', Validators.required] }),
      this.formBuilder.group({ nome: ['', Validators.required] })
    ])
  });

  openModal(): void {
      const dialogConfig = new MatDialogConfig();
      this.scrollService.save();
      dialogConfig.width = '600px';
      dialogConfig.height = 'auto';   
      dialogConfig.autoFocus = false;
      dialogConfig.restoreFocus = false;
      dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
      dialogConfig.data = {
        convidado: this.convidado,
        mensagem: this.mensagemPosConfirmacao()
      };
      this.dialog.open(ModalMsgConfirmacaoComponent, dialogConfig)
      .afterClosed().subscribe(() => {
        this.scrollService.restore();
      });
    }

  mensagemPosConfirmacao(): string {
    let nomes = this.convidado.nome?.split(" ");
    return this.convidado.statusPresenca ?
      `${nomes?.[0]}, ${Constantes.MSG_COMPARECIMENTO_SIM}` :
      `${nomes?.[0]}, ${Constantes.MSG_COMPARECIMENTO_NAO}`;
  }

  decrease() {
    if (this.count > 0) {
      this.count--;
      this.numAcompanhantes.pop()
    }
  }

  increase() {
    this.count++;
    this.numAcompanhantes.push(this.count)
  }

  verificaStatusPresenca(): boolean {
    return this.presenca.controls.statusPresenca.value === 'Sim'
  }

  confirm(): void {
    const acompanhantes = this.presenca.controls.acompanhantes.value
      .map(acomp => ({
        nome: acomp.nome
      }));

    this.convidado = {
      nome: this.presenca.controls.nome.value,
      email: this.presenca.controls.email.value,
      statusPresenca: this.verificaStatusPresenca(),
      telefone: this.presenca.controls.telefone.value,
      acompanhantes: acompanhantes
    }
    this.apiService.confirmarPresenca(this.convidado).subscribe({
      next: () => {
        this.notificacao.notificar("Confirmação de presença registrada com sucesso!"); 
        this.openModal(); 
      },
      error: (error) => {
        console.error('Erro ao enviar dados:', error);
        this.notificacao.notificarLonga("Houve um erro ao confirmar a presença, tente novamente, se o problema persistir entre em contato com os noivos")
      },
      complete: () => {
        this.apiService
          .notificarPresenca(
            `${this.convidado.nome} vai ao casamento? ${this.presenca.controls.statusPresenca.value} \nTelefone: ${this.convidado.telefone}`)
              .subscribe({
                error: () => {
                  console.log("erro ao enviar notificação");
                }
              });
        this.presenca.reset();
        this.presenca.controls.email.setValue('');
        this.presenca.controls.acompanhantes.controls.forEach(control => {
          control.get('nome')?.setValue('');
        })
      }
    });

  }
}
