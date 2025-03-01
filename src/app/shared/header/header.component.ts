import { Component, inject } from '@angular/core';
import { ItensSelecionadosService } from '../../services/itensSelecionados.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-header',
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  ItensSelecionadosService: ItensSelecionadosService = inject(ItensSelecionadosService);

}
