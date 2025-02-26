import { Component } from '@angular/core';
import { ItensSelecionadosService } from '../../services/itensSelecionados.service';
import { IListaPresentes } from '../../interfaces/iListaPresentes';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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
    //private notificacao: NotificacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.presenteSelecionado = this.itensSelecionadosService.obtemCarrinho();
    this.calcularTotal();
  }

  removerProdutoCarrinho(id: number) {
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
    //this.notificacao.notificar('Compra realizada com sucesso'); 
    //this.router.navigate(['produtos']);
  }

  adicionarMaisPresentes() {
    this.mostrarCarrinho = false;
    this.router.navigate(['lista-presentes']);  
  }
}
