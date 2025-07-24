import { Routes } from '@angular/router';
import { ModalStatusPagamentoComponent } from './components/mod/modal-status-pagamento/modal-status-pagamento.component';
import { ModalMsgConfirmacaoComponent } from './components/mod/modal-msg-confirmacao/modal-msg-confirmacao.component';

export const routes: Routes = [

    {path: 'status-pagamento', component: ModalStatusPagamentoComponent},
    {path: 'mensagem-convidado', component: ModalMsgConfirmacaoComponent}
   
];
