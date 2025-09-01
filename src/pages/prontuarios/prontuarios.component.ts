import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

interface Prontuario {
  paciente: string;
  idade: number;
  diagnostico: string;
  anotacoes: string[];
}

@Component({
  selector: 'app-prontuarios',
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './prontuarios.component.html',
  styleUrl: './prontuarios.component.scss'
})
export class ProntuariosComponent {
 prontuarios: Prontuario[] = [
    { paciente: 'Maria Oliveira', idade: 45, diagnostico: 'Hipertensão', anotacoes: ['Consulta inicial em 01/08/2025', 'Pressão arterial controlada.'] },
    { paciente: 'Carlos Souza', idade: 62, diagnostico: 'Diabetes Tipo 2', anotacoes: ['Consulta inicial em 10/07/2025', 'Necessário ajustar insulina.'] },
    { paciente: 'Fernanda Silva', idade: 30, diagnostico: 'Asma', anotacoes: ['Consulta inicial em 20/08/2025', 'Manter uso de bombinha.'] }
  ];

  prontuarioSelecionado: Prontuario | null = null;
  novaAnotacao: string = '';

  selecionarProntuario(p: Prontuario) {
    this.prontuarioSelecionado = p;
  }

  adicionarAnotacao() {
    if (this.novaAnotacao.trim() && this.prontuarioSelecionado) {
      this.prontuarioSelecionado.anotacoes.push(this.novaAnotacao);
      this.novaAnotacao = '';
    }
  }
}
