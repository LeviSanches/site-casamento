import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { InicioComponent } from "./components/inicio/inicio.component";
import { CasalComponent } from "./components/casal/casal.component";
import { CerimoniaComponent } from "./components/cerimonia/cerimonia.component";
import { ListaPresentesComponent } from "./components/lista-presentes/lista-presentes.component";
import { ConfirmePresencaComponent } from "./components/confirme-presenca/confirme-presenca.component";
import { DuvidasComponent } from "./components/duvidas/duvidas.component";
import { ItensSelecionadosService } from './services/itensSelecionados.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ItensSelecionadosComponent } from './components/itens-selecionados/itens-selecionados.component';
import { ContagemRegressivaComponent } from "./components/contagem-regressiva/contagem-regressiva.component";
import { AudioComponent } from './components/audio/audio.component';
import { ScrollRestorerService } from './services/scrollRestorer.service';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    InicioComponent,
    CasalComponent,
    CerimoniaComponent,
    ListaPresentesComponent,
    ConfirmePresencaComponent,
    DuvidasComponent,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule, 
    ContagemRegressivaComponent,
    AudioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  ItensSelecionadosService: ItensSelecionadosService = inject(ItensSelecionadosService);
  itemService: ItensSelecionadosService = inject(ItensSelecionadosService);
  dialog: MatDialog = inject(MatDialog);
  scrollService = inject(ScrollRestorerService);
  overlay: Overlay = inject(Overlay);
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

  abrirCarrinho(): void {
    this.openModal();
  }

}
