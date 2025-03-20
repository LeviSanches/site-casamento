import { Component, inject } from '@angular/core';
import { ItensSelecionadosService } from '../../services/itensSelecionados.service';
import { IListaPresentes } from '../../interfaces/iListaPresentes';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificacaoService } from '../../services/notificacao.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { PagamentoService } from '../../services/pagamento.service';
import { IPagamento } from '../../interfaces/iPagamento';

@Component({
  selector: 'app-itens-selecionados',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskDirective
  ],
  templateUrl: './itens-selecionados.component.html',
  styleUrl: './itens-selecionados.component.css',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    }
  ]
})
export class ItensSelecionadosComponent {

  private pagamentoService = inject(PagamentoService)

  presenteSelecionado: IListaPresentes[] = [];
  mostrarCarrinho: boolean = true;
  total = 0;
  informacoesPagamento: IPagamento = {
    nomeConvidado: '',
    email: '',
    produto: []
  }

  constructor(
    public itensSelecionadosService: ItensSelecionadosService,
    public dialogRef: MatDialogRef<ItensSelecionadosComponent>,
    private router: Router,
    private notificacao: NotificacaoService
  ) { }

  private formBuilder = inject(FormBuilder);

  informacoes = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    telefone: ['', Validators.required],
    mensagem: ['', Validators.required],
  });

  formaPagamento = this.formBuilder.group({
    cartao: [''],
    boleto: [''],
    pix: [''],
  });

  ngOnInit(): void {
    this.presenteSelecionado = this.itensSelecionadosService.obtemCarrinho();
    this.calcularTotal();
  }

  close(): void {
    this.dialogRef.close();
  }

  removerProdutoCarrinho(id: number) {
    this.notificacao.notificar('Produto removido do carrinho');
    this.itensSelecionadosService.removerProdutoCarrinho(id);
    this.presenteSelecionado = this.itensSelecionadosService.obtemCarrinho();
    this.calcularTotal();
    if (this.total == 0) {
      this.close();
    }
  }

  calcularTotal() {
    this.total = this.presenteSelecionado.reduce((prev, curr) => prev + (curr.preco * curr.quantidade), 0)
  }

  comprar(): void {
    if (this.presenteSelecionado.length === 0) {
      this.notificacao.notificar('Verifique o carrinho de compras');
      return;
    }
    if (this.informacoes.invalid) {
      this.notificacao.notificar('Verifique as informações de contato');
      return;
    }
    this.informacoesPagamento = {
      nomeConvidado: this.informacoes.controls.nome.value!,
      email: this.informacoes.controls.email.value!,
      produto: this.presenteSelecionado.map(p => {
        return {
          id: p.id,
          nome: p.nome,
          preco: p.preco,
          imagem: p.imagem,
          categoria: p.categoria,
          quantidade: p.quantidade
        }
      })
    }
    console.log(this.informacoesPagamento)
    this.pagamentoService.pagar(this.informacoesPagamento).subscribe(
      (data: any) => {
        console.log('Resposta:', JSON.stringify(data));
        if (data) {
          window.open(data.url, '_blank');
        } else {
          console.error('Erro: Resposta veio nula');
        }
      },
      (error: any) => {
        console.error('Erro ao enviar dados:', error);
      }
    );
    /*this.pagamentoService.pagar(this.informacoesPagamento).subscribe(
      () => {
        this.itensSelecionadosService.limparCarrinho();
        //this.notificacao.notificar('Compra realizada com sucesso');
        console.log('Dados enviados com sucesso')
        this.close();
      },
      (error: any) => {
        console.error('Erro ao enviar dados:', error);
      }
    )*/
  }

}
