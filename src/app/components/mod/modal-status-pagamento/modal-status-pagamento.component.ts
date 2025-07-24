import { Component, inject } from '@angular/core';
import { NotificacaoService } from '../../../services/notificacao.service';
import { PagamentoService } from '../../../services/pagamento.service';
import { Constantes } from '../../../constants/Constantes';
import { IPagamento } from '../../../interfaces/iPagamento';

@Component({
  selector: 'app-modal-status-pagamento',
  imports: [],
  templateUrl: './modal-status-pagamento.component.html'
})
export class ModalStatusPagamentoComponent {

  private notificacao = inject(NotificacaoService);
  private pagamentoService = inject(PagamentoService);

  dadosPagamento: IPagamento = {
    nomeConvidado: '',
    email: '',
    telefone: '',
    status: '',
    mensagem: '',
    produtos: []
  };

  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const paymentId = urlParams.get('payment_id');
    const preferenceId = urlParams.get('preference_id');

    this.pagamentoService.buscarInformacoesConvidado(preferenceId).subscribe({
      next: (res: any) => {
        this.dadosPagamento.nomeConvidado = res.payer.name;
        this.dadosPagamento.email = res.payer.email;
        this.dadosPagamento.telefone = `${res.payer.phone.area_code}${res.payer.phone.number}`;
        this.dadosPagamento.mensagem = res.additional_info

        const produtos: any[] = res.items;
        produtos.forEach(p => {
          this.dadosPagamento.produtos?.push({
            id: p.id,
            nome: p.title,
            preco: p.unit_price,
            imagem: p.picture_url,
            disponivel: p.available_quantity,
            categoria: p.category_id,
            quantidade: p.quantity
          })
        })
      }
    })

    this.pagamentoService.buscarPagamento(paymentId).subscribe({
      next: (res: any) => {
        const newUrl = window.location.protocol + "//" + window.location.host;
        switch (status) {
          case 'approved':
            this.dadosPagamento.status = 'aprovado';     
            this.notificacao.notificarLonga(this.dadosPagamento.nomeConvidado.trim() + Constantes.MSG_PAGAMENTO_APROVADO);       
            this.pagamentoService.salvarPagamento(this.dadosPagamento).subscribe({
              next: (res) => {                
                window.history.pushState({ path: newUrl }, '', newUrl);
                this.pagamentoService.notificarPagamento(`🥳🥳 ${this.dadosPagamento.nomeConvidado} nos deu um presente de casamento! 🥳🥳`)
                  .subscribe({
                    error: () => {
                      console.log("erro ao notificar pagamento...");
                    }
                  });
              },
              error: (err) => {                
                window.history.pushState({ path: newUrl }, '', newUrl);
              }
            });
            break;
          case 'pending':
            if (res.status === 'approved' || res.status === 'authorized') {
              this.dadosPagamento.status = 'aprovado';
              this.notificacao.notificarLonga(this.dadosPagamento.nomeConvidado.trim() + Constantes.MSG_PAGAMENTO_APROVADO);
              this.pagamentoService.salvarPagamento(this.dadosPagamento).subscribe({
                next: (res) => {                  
                  window.history.pushState({ path: newUrl }, '', newUrl);
                },
                error: (err) => {                  
                  window.history.pushState({ path: newUrl }, '', newUrl);
                }
              });
            }
            else {
              this.dadosPagamento.status = 'pendente';
              this.notificacao.notificarLonga(this.dadosPagamento.nomeConvidado.trim() + Constantes.MSG_PAGAMENTO_PENDENTE);
              window.history.pushState({ path: newUrl }, '', newUrl);
            }
            break;
          case 'failure':
            this.dadosPagamento.status = 'falhou'
            this.notificacao.notificarLonga(this.dadosPagamento.nomeConvidado.trim() + Constantes.MSG_PAGAMENTO_FALHOU);            
            window.history.pushState({ path: newUrl }, '', newUrl);
            break;
          default:
            this.dadosPagamento.status = 'desconhecido';
            this.notificacao.notificarLonga(this.dadosPagamento.nomeConvidado.trim() + Constantes.MSG_PAGAMENTO_DESCONHECIDO);
            window.history.pushState({ path: newUrl }, '', newUrl);
            break;
        }
      },
      error: (err) => {
        console.log('erro', err);
      }
    });
  }

}