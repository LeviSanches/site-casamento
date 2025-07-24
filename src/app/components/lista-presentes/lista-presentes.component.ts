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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Overlay } from '@angular/cdk/overlay';
import { ScrollRestorerService } from '../../services/scrollRestorer.service';


@Component({
  selector: 'app-lista-presentes',
  imports: [CommonModule, NgxPaginationModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './lista-presentes.component.html',
  styleUrl: './lista-presentes.component.css'
})
export class ListaPresentesComponent {

  listaPresentesService: ListaPresentesService = inject(ListaPresentesService);
  itemService: ItensSelecionadosService = inject(ItensSelecionadosService);
  notificacao: NotificacaoService = inject(NotificacaoService);
  dialog: MatDialog = inject(MatDialog);
  overlay: Overlay = inject(Overlay);
  scrollService = inject(ScrollRestorerService);

  listaPresentes: IListaPresentes[] = [];
  pagina: number = 1;

  loading: boolean = false;

  openModal(): void {
    const dialogConfig = new MatDialogConfig();
    this.scrollService.save();
    dialogConfig.width = '600px';
    dialogConfig.height = 'auto';
    dialogConfig.maxHeight = '90vh'; // Máximo de 90% da altura da viewport
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.autoFocus = false;
    dialogConfig.restoreFocus = false;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    this.loading = false;
    this.dialog.open(ItensSelecionadosComponent, dialogConfig)
    .afterClosed().subscribe(() => {
      this.scrollService.restore();
    });
  }

  ngOnInit() {
    this.listaPresentesService.getProdutos().subscribe(
      (produtoJson: IListaPresentes[]) => {
      this.listaPresentes = produtoJson;
    });
  }

  comprar(presente: IListaPresentes): void {
    this.itemService.adicionarAoCarrinho(presente);
    this.loading = true;
    setTimeout(() => {
      this.openModal();
    }, 1000);
  }

  ordenarPorMenorPreco(): void {
    this.listaPresentes.sort((a, b) => a.preco - b.preco);
  }

  ordenarPorMaiorPreco(): void {
    this.listaPresentes.sort((a, b) => b.preco - a.preco);
  }

}
