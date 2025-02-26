import { Routes } from '@angular/router';
import { ItensSelecionadosComponent } from './components/itens-selecionados/itens-selecionados.component';
import { ListaPresentesComponent } from './components/lista-presentes/lista-presentes.component';

export const routes: Routes = [
    { path: 'itens-selecionados', component: ItensSelecionadosComponent },
    { path: 'lista-presentes', component: ListaPresentesComponent }
];
