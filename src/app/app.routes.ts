import { Routes } from '@angular/router';
import { AuthGuard } from '../app/core/auth.guard';
import { AdminGuard } from './core/admin.guard';
import { ProfissionalGuard } from './core/profissional.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../pages/login/login.component').then(m => m.LoginComponent),
    title: 'Login'
  },
  {
    path: 'home',
    loadComponent: () => import('../pages/home/home.component').then(m => m.HomeComponent),
    title: 'Home',
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastrar-consultas',
    loadComponent: () => import('../pages/cadastrar-consulta/cadastrar-consultas.component').then(m => m.CadastrarConsultasComponent),
    title: 'Cadastrar Consultas',
    canActivate: [AuthGuard]
  },
  {
    path: 'historico-clinico',
    loadComponent: () => import('../pages/informacoes-historico-clinico/informacoes-historico-clinico.component').then(m => m.InformacoesHistoricoClinicoComponent),
    title: 'Historico Clinico',
    canActivate: [AuthGuard]
  },
  {
    path: 'telemedicina',
    loadComponent: () => import('../pages/telemedicina/telemedicina.component').then(m => m.TelemedicinaComponent),
    title: 'Telemedicina',
    canActivate: [AuthGuard]
  },
  {
    path: 'consultas/:id',
    loadComponent: () => import('../pages/consulta-detalhe/consulta-detalhe.component').then(m => m.ConsultaDetalheComponent),
    title: 'Detalhes da Consulta',
    canActivate: [AuthGuard]
  },
  { path: 'profissional/prontuarios',
     loadComponent: () => import('../pages/prontuarios/prontuarios.component').then(m => m.ProntuariosComponent),
    title: 'Prontuários',
    canActivate: [ProfissionalGuard],
  },
  { path: 'profissional/historico-clinico',
     loadComponent: () => import('../pages/historico-clinico/historico-clinico.component').then(m => m.HistoricoClinicoComponent),
    title: 'Historico Clinico',
    canActivate: [ProfissionalGuard],
  },
  { path: 'profissional/receita-digital',
     loadComponent: () => import('../pages/receitas-digitais/receitas-digitais.component').then(m => m.ReceitasDigitaisComponent),
    title: 'Receitas Digitais',
    canActivate: [ProfissionalGuard],
  },
  { path: 'admin/profissionais/cadastro',
     loadComponent: () => import('../pages/cadastrar-profissional/cadastrar-profissional.component').then(m => m.CadastrarProfissionalComponent),
    title: 'Cadastrar Profissionais',
    canActivate: [AdminGuard],
  },
  { path: 'admin/relatorios',
     loadComponent: () => import('../pages/relatorios/relatorios.component').then(m => m.RelatoriosComponent),
    title: 'Relatórios',
    canActivate: [AdminGuard],
  },
  { path: 'admin/internacoes',
     loadComponent: () => import('../pages/internacoes/internacoes.component').then(m => m.InternacoesComponent),
    title: 'Internações',
    canActivate: [AdminGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
