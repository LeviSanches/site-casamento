import { Component, inject, Inject } from '@angular/core';
import { IListaPresentes } from '../../interfaces/iListaPresentes';
import { ListaPresentesService } from '../../services/listaPresentes.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, RouterModule } from '@angular/router';
import { ItensSelecionadosService } from '../../services/itensSelecionados.service';


@Component({
  selector: 'app-lista-presentes',
  imports: [CommonModule, NgxPaginationModule, RouterModule],
  templateUrl: './lista-presentes.component.html',
  styleUrl: './lista-presentes.component.css'
})
export class ListaPresentesComponent {

  listaPresentesService: ListaPresentesService = inject(ListaPresentesService);
  itemService: ItensSelecionadosService = inject(ItensSelecionadosService);

  listaPresentes: IListaPresentes[] = [];
  valorTotal: number = 0
  p: number = 1;

  constructor(private router: Router) { }
  

  ngOnInit() {
    this.listaPresentesService.getProdutos().subscribe((data: IListaPresentes[]) => {
      this.listaPresentes = data;
    });
  }

  comprar(presente: IListaPresentes): void {
    this.itemService.adicionarAoCarrinho(presente);
    alert('Produto adicionado ao carrinho');
    this.router.navigate(['itens-selecionados']);
  }
  

}
