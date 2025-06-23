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

  private formBuilder = inject(FormBuilder);
  private notificacao = inject(NotificacaoService);
  private apiService = inject(ConfirmarPresencaService);

  convidado: IConvidado = {
    nome: '',
    email: '',
    statusPresenca: false,
    acompanhantes: [],
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

  mostrarFormulario: boolean = true;

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
      acompanhantes: acompanhantes
    }
    this.apiService.confirmarPresenca(this.convidado).subscribe({
      next: () => {
        this.notificacao.notificar("Confirmação de presença registrada com sucesso!");        
        this.mostrarFormulario = false
      },
      error: (error) => {
        console.error('Erro ao enviar dados:', error);
        this.notificacao.notificarLonga("Houve um erro ao confirmar a presença, tente novamente, se o problema persistir entre em contato com os noivos")
      },
      complete: () => this.presenca.reset()
    });

  }
}
