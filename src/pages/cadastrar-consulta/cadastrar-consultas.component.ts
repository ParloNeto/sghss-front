import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastrar-consultas',
  imports: [FooterComponent, HeaderComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-consultas.component.html',
  styleUrl: './cadastrar-consultas.component.scss'
})
export class CadastrarConsultasComponent {
  #fb = inject(FormBuilder);

  agendamentoForm = this.#fb.group({
    especialidade: ['', Validators.required],
    profissional: ['', Validators.required],
    tipoConsulta: ['', Validators.required],
    dataHora: ['', Validators.required]
  });

  especialidades = ['Cardiologia', 'Ortopedia', 'Dermatologia', 'Pediatria'];
  profissionais = ['Dr. João Silva', 'Dra. Maria Souza', 'Dr. Carlos Lima'];

  confirmar() {
    if (this.agendamentoForm.valid) {
      console.log('Agendamento confirmado:', this.agendamentoForm.value);
      alert('Consulta agendada com sucesso!');
      this.agendamentoForm.reset();
    } else {
      alert('Preencha todos os campos obrigatórios.');
    }
  }
}
