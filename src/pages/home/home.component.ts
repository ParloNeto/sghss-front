import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

interface AcessoRapido {
  link: string;
  text: string;
}

@Component({
  selector: 'app-home',
  imports: [FooterComponent, HeaderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  #router = inject(Router);

  #auth = inject(AuthService);

  nome = this.#auth.getUserName();
  usuario = this.#auth.getUserData();
  public acessoRapido: AcessoRapido[] = [];

  acessoRapidoUser: AcessoRapido[] = [
    { link: '/historico-clinico', text: 'Histórico Clinico' },
    { link: '/cadastrar-consultas', text: 'Marcar Consulta' },
    { link: '/telemedicina', text: 'Telemedicina' },
  ];

  acessoRapidoAdmin: AcessoRapido[] = [
    { link: '/admin/relatorios', text: 'Relatorios' },
    { link: '/admin/profissionais/cadastro', text: 'Cadastro de Profissionais' },
    { link: '/admin/internacoes', text: 'Fluxo de internações' },
  ];

  acessoRapidoProfissional: AcessoRapido[] = [
    { link: '/profissional/prontuarios', text: 'Prontuários' },
    { link: '/profissional/historico-clinico', text: 'Histórico Clínico' },
    { link: '/profissional/receita-digital', text: 'Receitas Digitais' },
  ];

  ngOnInit(): void {
    console.log(this.#auth.getUserData());

    if (this.usuario?.roles.includes('ROLE_ADMIN'))
      this.acessoRapido = this.acessoRapidoAdmin;

    if (this.usuario?.roles.includes('ROLE_PACIENTE'))
      this.acessoRapido = this.acessoRapidoUser;

    if (this.usuario?.roles.includes('ROLE_PROFISSIONAL'))
      this.acessoRapido = this.acessoRapidoProfissional;


  }

  minhasConsultas = [
    {
      id: '1',
      profissional: 'Dr. Paulo Neto',
      dataHora: '2025-08-13 16:30',
      endereco: 'Rua Alberto Malfin, 255',
    },
    {
      id: '2',
      profissional: 'Dra. Maria Souza',
      dataHora: '2025-08-15 09:00',
      endereco: 'Rua Joao Serra Arantes, 1245',
    },
  ];

  abrirConsulta(id: string) {
    this.#router.navigate(['/consultas', id]);
  }
}
