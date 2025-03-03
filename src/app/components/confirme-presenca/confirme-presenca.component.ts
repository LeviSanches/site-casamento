import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirme-presenca',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    NgxMaskDirective,
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './confirme-presenca.component.html',
  styleUrl: './confirme-presenca.component.css'
})
export class ConfirmePresencaComponent {

  private formBuilder = inject(FormBuilder);

  quantidadeAcompanhantes: number[] = [0, 1, 2, 3, 4, 5];

  count: number = 0;
  numAcompanhantes: number[] = [];
  nomeAcompanhante: string = 'nomeAcompanhante'
  

  presenca = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    telefone: ['', Validators.required],
    statusPresenca: ['', Validators.required],
    nomeAcompanhante1: ['', Validators.required],
    nomeAcompanhante2: ['', Validators.required],
    nomeAcompanhante3: ['', Validators.required],
    nomeAcompanhante4: ['', Validators.required],
    nomeAcompanhante5: ['', Validators.required],
  });
  
  returnStatusPresenca(): string {
    return this.presenca.controls.statusPresenca.value!;
  }

  decrease() {
    if (this.count > 0) {
      this.count--;
      this.numAcompanhantes.pop()
    }
  }

  increase() {
    this.count++;
    this.numAcompanhantes.push(this.count)
  }

  confirm(): void {
    console.log(this.presenca.value);
  }

}
