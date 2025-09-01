import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

interface Internacao {
  paciente: string;
  diagnostico: string;
  dataEntrada: string;
  status: 'Internado' | 'Observação' | 'Alta';
}

@Component({
  selector: 'app-internacoes',
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './internacoes.component.html',
  styleUrl: './internacoes.component.scss'
})
export class InternacoesComponent {
internacoes: Internacao[] = [
    { paciente: 'Maria Oliveira', diagnostico: 'Pneumonia', dataEntrada: '28/08/2025', status: 'Internado' },
    { paciente: 'Carlos Souza', diagnostico: 'Fratura de fêmur', dataEntrada: '25/08/2025', status: 'Observação' },
    { paciente: 'Fernanda Silva', diagnostico: 'COVID-19', dataEntrada: '15/08/2025', status: 'Internado' }
  ];

  darAlta(i: number) {
    this.internacoes[i].status = 'Alta';
    alert(`Paciente ${this.internacoes[i].paciente} recebeu alta!`);
  }
}
