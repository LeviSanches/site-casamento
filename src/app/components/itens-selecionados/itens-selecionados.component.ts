import { Component } from '@angular/core';
import { ItensSelecionadosService } from '../../services/itensSelecionados.service';
import { IListaPresentes } from '../../interfaces/iListaPresentes';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificacaoService } from '../../services/notificacao.service';

@Component({
  selector: 'app-itens-selecionados',
  imports: [CommonModule, RouterModule],
  templateUrl: './itens-selecionados.component.html',
  styleUrl: './itens-selecionados.component.css'
})
export class ItensSelecionadosComponent {

  presenteSelecionado: IListaPresentes[] = [];
  mostrarCarrinho: boolean = true;
  total = 0;

  constructor(
    public itensSelecionadosService: ItensSelecionadosService,
    public dialogRef: MatDialogRef<ItensSelecionadosComponent>,
    private router: Router,
    private notificacao: NotificacaoService
  ) {}

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
  }

  calcularTotal() {
    this.total = this.presenteSelecionado.reduce((prev, curr) => prev + (curr.preco * curr.quantidade), 0)
  }

  /*comprar() {        
    this.itensCarrinho = this.carrinhoService.limparCarrinho();     
    this.notificacao.notificar('Compra realizada com sucesso'); 
    this.ngOnInit();
  }*/

  comprar() {        
    this.itensSelecionadosService.limparCarrinho();     
    this.notificacao.notificar('Compra realizada com sucesso'); 
    //this.router.navigate(['produtos']);
  }

}
