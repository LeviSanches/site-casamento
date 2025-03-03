import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { InicioComponent } from "./components/inicio/inicio.component";
import { CasalComponent } from "./components/casal/casal.component";
import { CerimoniaComponent } from "./components/cerimonia/cerimonia.component";
import { ListaPresentesComponent } from "./components/lista-presentes/lista-presentes.component";
import { ConfirmePresencaComponent } from "./components/confirme-presenca/confirme-presenca.component";
import { DuvidasComponent } from "./components/duvidas/duvidas.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { ItensSelecionadosService } from './services/itensSelecionados.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ItensSelecionadosComponent } from './components/itens-selecionados/itens-selecionados.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    InicioComponent,
    CasalComponent,
    CerimoniaComponent,
    ListaPresentesComponent,
    ConfirmePresencaComponent,
    DuvidasComponent,
    FooterComponent,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lais&lais';

  ItensSelecionadosService: ItensSelecionadosService = inject(ItensSelecionadosService);
  itemService: ItensSelecionadosService = inject(ItensSelecionadosService);
  dialog: MatDialog = inject(MatDialog);

  loading: boolean = false;

  openModal(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '600px';
    dialogConfig.height = 'auto';
    dialogConfig.maxHeight = '90vh'; // Máximo de 90% da altura da viewport
    dialogConfig.panelClass = 'custom-dialog-container';

    this.loading = false;
    this.dialog.open(ItensSelecionadosComponent, dialogConfig);
  }

  abrirCarrinho(): void {
    this.openModal();
  }

}
