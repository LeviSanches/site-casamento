import { Component, inject, Inject } from '@angular/core';
import { IListaPresentes } from '../../interfaces/iListaPresentes';
import { ListaPresentesService } from '../../services/listaPresentes.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-lista-presentes',
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './lista-presentes.component.html',
  styleUrl: './lista-presentes.component.css'
})
export class ListaPresentesComponent {

  listaPresentesService: ListaPresentesService = inject(ListaPresentesService);

  listaPresentes: IListaPresentes[] = [];
  valorTotal: number = 0
  p: number = 1;
  

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
