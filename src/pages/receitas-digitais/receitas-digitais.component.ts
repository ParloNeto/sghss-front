import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

interface Receita {
  paciente: string;
  medicamento: string;
  posologia: string;
  observacoes: string;
  data: string;
}

@Component({
  selector: 'app-receitas-digitais',
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './receitas-digitais.component.html',
  styleUrl: './receitas-digitais.component.scss'
})
export class ReceitasDigitaisComponent {
receitas: Receita[] = [
    {
      paciente: 'Maria Oliveira',
      medicamento: 'Losartana 50mg',
      posologia: '1 comprimido ao dia',
      observacoes: 'Tomar após o café da manhã',
      data: '01/09/2025'
    }
  ];

  novaReceita: Receita = {
    paciente: '',
    medicamento: '',
    posologia: '',
    observacoes: '',
    data: new Date().toLocaleDateString()
  };

  salvarReceita() {
    if (this.novaReceita.paciente && this.novaReceita.medicamento && this.novaReceita.posologia) {
      this.receitas.push({ ...this.novaReceita });
      this.novaReceita = {
        paciente: '',
        medicamento: '',
        posologia: '',
        observacoes: '',
        data: new Date().toLocaleDateString()
      };
      alert('Receita digital cadastrada com sucesso!');
    } else {
      alert('Preencha os campos obrigatórios.');
    }
  }
}
