import { Component, inject } from '@angular/core';
import { NotificacaoService } from '../../../services/notificacao.service';
import { PagamentoService } from '../../../services/pagamento.service';
import { Constantes } from '../../../constants/Constantes';
import { IPagamento } from '../../../interfaces/iPagamento';
import { IListaPresentes } from '../../../interfaces/iListaPresentes';

@Component({
  selector: 'app-modal-status-pagamento',
  imports: [],
  templateUrl: './modal-status-pagamento.component.html',
  styleUrl: './modal-status-pagamento.component.css'
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
    const preferencia = urlParams.get('preference_id');
    console.log('status do pagamento:', status);

    this.pagamentoService.buscarPagamento(preferencia).subscribe({
      next: (res: any) => {
        this.dadosPagamento.nomeConvidado = res.payer.name;
        this.dadosPagamento.email = res.payer.email;
        this.dadosPagamento.telefone = `${res.payer.phone.area_code}${res.payer.phone.number}`;
        this.dadosPagamento.mensagem = res.additional_info
        const produtos: any = res.items;
        for(let i = 0; i < produtos.length; i++) {
          this.dadosPagamento.produtos?.push({
            id: produtos[i].id,
            nome: produtos[i].title,
            preco: produtos[i].unit_price,
            imagem: produtos[i].picture_url,
            disponivel: produtos[i].available_quantity,
            categoria: produtos[i].category_id,
            quantidade: produtos[i].quantity
           });
        }
        switch (status) {
          case 'approved':
            this.dadosPagamento.status = 'aprovado';
            this.notificacao.notificarLonga(this.dadosPagamento.nomeConvidado.trim() + Constantes.MSG_PAGAMENTO_APROVADO);
            break;
          case 'pending':
            this.dadosPagamento.status = 'pendente';
            this.notificacao.notificarLonga(this.dadosPagamento.nomeConvidado.trim() + Constantes.MSG_PAGAMENTO_PENDENTE);
            break;
          case 'failure':
            this.dadosPagamento.status = 'falhou'
            this.notificacao.notificarLonga(this.dadosPagamento.nomeConvidado.trim() + Constantes.MSG_PAGAMENTO_FALHOU);
            break;
          default:
            this.dadosPagamento.status = 'desconhecido';
            this.notificacao.notificarLonga(this.dadosPagamento.nomeConvidado.trim() + Constantes.MSG_PAGAMENTO_DESCONHECIDO);
            break;
        }
        this.pagamentoService.salvarPagamento(this.dadosPagamento).subscribe({
          next: (res) => {
            console.log('dados de resposta: ', res);
          },
          error: (err) => {
            console.log('erro ao salvar pagamento: ', err);
          }
        });
      },
      error: (err) => {
        console.log('erro', err);
      }
    }
  );
  }

}