import { Routes } from '@angular/router';
import { ItensSelecionadosComponent } from './components/itens-selecionados/itens-selecionados.component';

export const routes: Routes = [
    { path: 'itens-selecionados', component: ItensSelecionadosComponent, pathMatch: 'full' }
];
