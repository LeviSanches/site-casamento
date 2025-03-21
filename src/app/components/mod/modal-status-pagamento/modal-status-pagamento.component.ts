import { Component, inject } from '@angular/core';
import { NotificacaoService } from '../../../services/notificacao.service';
import { PagamentoService } from '../../../services/pagamento.service';

@Component({
  selector: 'app-modal-status-pagamento',
  imports: [],
  templateUrl: './modal-status-pagamento.component.html',
  styleUrl: './modal-status-pagamento.component.css'
})
export class ModalStatusPagamentoComponent {

  private notificacao = inject(NotificacaoService);
  private pagamentoService = inject(PagamentoService);

  status: string = '';
  nome = '';
  email: string = '';
  telefone: string = '';
  //payer.email
  //payer.name
  //payer.phone.area_code + payer.phone.number


  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const preferencia = urlParams.get('preference_id');
    console.log('status do pagamento:', status);

    this.pagamentoService.buscarPagamento(preferencia).subscribe({
      next: (res: any) => {
        this.nome = res.payer.name;
        this.email = res.payer.email;
        this.telefone = `${res.payer.phone.area_code}${res.payer.phone.number}`;
        switch (status) {
          case 'approved':
            this.status = 'Aprovado';
            this.notificacao.notificarLonga(`Obrigado ${this.nome.trim()}, por nos presentear! Seu carinho e generosidade significa muito para nós.`);
            break;
          case 'pending':
            this.status = 'Pendente';
            this.notificacao.notificarLonga(`Oi ${this.nome.trim()}, seu pagamento está pendente, aguarde um pouco, caso não seja aprovado, entre em contato com os noivos`);
            break;
          case 'failure':
            this.status = 'Falhou'
            this.notificacao.notificarLonga(`Ops! ${this.nome.trim()}, seu pagamento falhou, tente novamente, caso o erro persista, entre em contato com os noivos`);
            break;
          default:
            this.status = 'Desconhecido';
            this.notificacao.notificarLonga(`Ops! ${this.nome.trim()}, algo deu errado, entre em contato com os noivos`);
            break;
        }
      },
      error: (err) => {
        console.log('erro', err);
      }
    }
  );
  }

}