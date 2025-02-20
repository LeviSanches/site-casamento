import { Component, inject, Inject } from '@angular/core';
import { IListaPresentes } from '../../interfaces/iListaPresentes';
import { ListaPresentesService } from '../../services/listaPresentes.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-lista-presentes',
  imports: [CommonModule],
  templateUrl: './lista-presentes.component.html',
  styleUrl: './lista-presentes.component.css'
})
export class ListaPresentesComponent {

  listaPresentes: IListaPresentes[] = [];
  valorTotal: number = 0
  listaPresentesService: ListaPresentesService = inject(ListaPresentesService);
  constructor() {}

  ngOnInit() {
    this.listaPresentesService.getProdutos().subscribe((data: IListaPresentes[]) => {
      this.listaPresentes = data;
    });
  }

  calcularValorTotal(): void {
    this.valorTotal = this.listaPresentes.reduce((total, item) => total + (item.preco * item.id), 0);
    alert(`Valor total: ${this.valorTotal}`);
  }
  

}
