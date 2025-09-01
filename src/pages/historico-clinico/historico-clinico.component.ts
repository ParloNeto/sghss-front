import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-historico-clinico',
  imports: [FooterComponent, HeaderComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './historico-clinico.component.html',
  styleUrl: './historico-clinico.component.scss'
})
export class HistoricoClinicoComponent {
 #fb = inject(FormBuilder);

  historicoForm = this.#fb.group({
    paciente: ['', Validators.required],
    condicoes: [''],
    medicamentos: [''],
    alergias: [''],
    observacoes: ['']
  });

  pacientes = ['Paulo Neto', 'João Silva', 'Maria Souza', 'Ana Oliveira'];

  salvar() {
    if (this.historicoForm.valid) {
      console.log('Histórico clínico salvo:', this.historicoForm.value);
      alert('Histórico clínico registrado com sucesso!');
      this.historicoForm.reset();
    } else {
      alert('Selecione um paciente para continuar.');
    }
  }
}
