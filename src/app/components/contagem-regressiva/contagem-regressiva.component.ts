import { Component } from '@angular/core';

@Component({
  selector: 'app-contagem-regressiva',
  imports: [],
  templateUrl: './contagem-regressiva.component.html',
  styleUrl: './contagem-regressiva.component.css'
})
export class ContagemRegressivaComponent {
  dias: number = 0;
  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;

  private eventoData: Date = new Date('2025-12-27T15:30:00');

  ngOnInit() {
    this.iniciarContagemRegressiva();
    console.log(this.iniciarContagemRegressiva());
  }

  private iniciarContagemRegressiva() {
    setInterval(() => {
      const agora = new Date();
      const diferenca = this.eventoData.getTime() - agora.getTime();

      if (diferenca <= 0) {
        this.dias = 0;
        this.horas = 0;
        this.minutos = 0;
        this.segundos = 0;
        return;
      }

      this.dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      this.horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
      this.segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
    }, 1000);
  }

}
