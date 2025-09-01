import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-profissional',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './cadastrar-profissional.component.html',
  styleUrl: './cadastrar-profissional.component.scss'
})
export class CadastrarProfissionalComponent {
 #fb = inject(FormBuilder);
  #router = inject(Router);

  cadastroForm = this.#fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    especialidade: ['', Validators.required],
    tipo: ['', Validators.required],
    registro: ['', Validators.required],
  });

  tipos = ['MEDICO', 'ENFERMEIRO', 'TECNICO'];

  salvar() {
    if (this.cadastroForm.valid) {
      console.log('Profissional cadastrado:', this.cadastroForm.value);
      alert('Profissional cadastrado com sucesso!');
      this.#router.navigate(['/admin/profissionais']);
    } else {
      alert('Preencha todos os campos obrigatórios!');
    }
  }
}
