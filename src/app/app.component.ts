import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicioComponent } from "./components/inicio/inicio.component";
import { CasalComponent } from "./components/casal/casal.component";
import { CerimoniaComponent } from "./components/cerimonia/cerimonia.component";
import { ListaPresentesComponent } from "./components/lista-presentes/lista-presentes.component";
import { ConfirmePresencaComponent } from "./components/confirme-presenca/confirme-presenca.component";
import { DuvidasComponent } from "./components/duvidas/duvidas.component";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InicioComponent, CasalComponent, CerimoniaComponent, ListaPresentesComponent, ConfirmePresencaComponent, DuvidasComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lais&lais';

}
