import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

interface Historico {
  data: string;
  profissional: string;
  especialidade: string;
  diagnostico: string;
  receita?: string;
}

@Component({
  selector: 'app-informacoes-historico-clinico',
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './informacoes-historico-clinico.component.html',
  styleUrl: './informacoes-historico-clinico.component.scss'
})
export class InformacoesHistoricoClinicoComponent {
historico: Historico[] = [
    {
      data: '01/08/2025',
      profissional: 'Dr. Paulo Neto',
      especialidade: 'Cardiologia',
      diagnostico: 'Hipertensão controlada',
      receita: 'Losartana 50mg - 1 comprimido/dia'
    },
    {
      data: '15/07/2025',
      profissional: 'Dra. Maria Oliveira',
      especialidade: 'Clínica Geral',
      diagnostico: 'Gripe viral',
      receita: 'Dipirona 500mg - 1 comp. a cada 8h'
    }
  ];
}
