import { Injectable } from '@angular/core';
import { IListaPresentes } from '../interfaces/iListaPresentes';

@Injectable({
  providedIn: 'root'
})
export class ItensSelecionadosService {

  itens: IListaPresentes[] = [];


  obtemCarrinho() {
    this.itens = JSON.parse(localStorage.getItem("presente") || "[]");
    return this.itens;
  }

  adicionarAoCarrinho(presente: IListaPresentes): void {
    this.itens.push(presente);
    localStorage.setItem("presente", JSON.stringify(this.itens));
  }

  removerProdutoCarrinho(presenteId: number): void {
    this.itens = this.itens.filter(item => item.id !== presenteId);
    localStorage.setItem("presente", JSON.stringify(this.itens));
  }

  limparCarrinho(): IListaPresentes[] {    
    localStorage.clear();
    return this.itens = [];
  }

}
