import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-relatorios',
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.scss',
})
export class RelatoriosComponent {
  relatorios = [
    { titulo: 'Consultas Realizadas', valor: 120 },
    {
      titulo: 'Consultas por Especialidade',
      valor: 'Cardiologia: 45, Ortopedia: 30, Pediatria: 45',
    },
    { titulo: 'Internações Ativas', valor: 12 },
    { titulo: 'Leitos Ocupados', valor: 8 },
  ];

  exportarPDF() {
    alert('Relatório exportado em PDF com sucesso!');
  }
}
