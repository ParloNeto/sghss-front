import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-telemedicina',
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
  ],

  templateUrl: './telemedicina.component.html',
  styleUrl: './telemedicina.component.scss',
})
export class TelemedicinaComponent {
   #fb = inject(FormBuilder);

  teleForm = this.#fb.group({
    paciente: ['', Validators.required],
    profissional: ['', Validators.required],
    dataHora: ['', Validators.required],
    link: ['https://meet.vidaplus.com/consulta-123']
  });

  pacientes = ['Paulo Neto', 'João Silva', 'Maria Souza'];
  profissionais = ['Dra. Ana Lima', 'Dr. Carlos Mendes'];

  iniciarConsulta() {
    if (this.teleForm.valid) {
      const { link } = this.teleForm.value;
      window.open(link!, '_blank');
    } else {
      alert('Preencha os dados antes de iniciar a consulta.');
    }
  }
}
