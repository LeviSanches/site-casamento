import { Component, inject, Inject } from '@angular/core';
import { IListaPresentes } from '../../interfaces/iListaPresentes';
import { ListaPresentesService } from '../../services/listaPresentes.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, RouterModule } from '@angular/router';
import { ItensSelecionadosService } from '../../services/itensSelecionados.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ItensSelecionadosComponent } from '../itens-selecionados/itens-selecionados.component';
import { NotificacaoService } from '../../services/notificacao.service';


@Component({
  selector: 'app-lista-presentes',
  imports: [CommonModule, NgxPaginationModule, RouterModule],
  templateUrl: './lista-presentes.component.html',
  styleUrl: './lista-presentes.component.css'
})
export class ListaPresentesComponent {

  listaPresentesService: ListaPresentesService = inject(ListaPresentesService);
  itemService: ItensSelecionadosService = inject(ItensSelecionadosService);
  notificacao: NotificacaoService = inject(NotificacaoService);
  dialog: MatDialog = inject(MatDialog);

  listaPresentes: IListaPresentes[] = [];
  valorTotal: number = 0
  p: number = 1;

  openModal(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '600px';
    dialogConfig.height = 'auto';
    dialogConfig.maxHeight = '90vh'; // Máximo de 90% da altura da viewport
    dialogConfig.panelClass = 'custom-dialog-container';
    
    this.dialog.open(ItensSelecionadosComponent, dialogConfig);
  }

  ngOnInit() {
    this.listaPresentesService.getProdutos().subscribe((data: IListaPresentes[]) => {
      this.listaPresentes = data;
    });
  }

  comprar(presente: IListaPresentes): void {
    this.itemService.adicionarAoCarrinho(presente);
    this.notificacao.notificar('Produto adicionado ao carrinho');
    this.openModal();
  }

}
