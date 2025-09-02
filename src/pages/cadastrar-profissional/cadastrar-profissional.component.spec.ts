import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarProfissionalComponent } from './cadastrar-profissional.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

describe('CadastrarProfissionalComponent', () => {
  let component: CadastrarProfissionalComponent;
  let fixture: ComponentFixture<CadastrarProfissionalComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, CadastrarProfissionalComponent],
      providers: [{ provide: Router, useValue: routerSpy }, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {},
          params: [],
          queryParams: [],
        }
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('formulário deve ser inválido quando vazio', () => {
    expect(component.cadastroForm.valid).toBeFalse();
  });

  it('formulário deve ser válido quando preenchido corretamente', () => {
    component.cadastroForm.setValue({
      nome: 'Dr. João Silva',
      email: 'joao@vidaplus.com',
      senha: '123456',
      especialidade: 'Cardiologia',
      tipo: 'MEDICO',
      registro: 'CRM-123456'
    });

    expect(component.cadastroForm.valid).toBeTrue();
  });

  it('salvar() deve navegar para /admin/profissionais quando formulário válido', () => {
    spyOn(window, 'alert'); // Evita que o alert real apareça

    component.cadastroForm.setValue({
      nome: 'Dr. João Silva',
      email: 'joao@vidaplus.com',
      senha: '123456',
      especialidade: 'Cardiologia',
      tipo: 'MEDICO',
      registro: 'CRM-123456'
    });

    component.salvar();

    expect(window.alert).toHaveBeenCalledWith('Profissional cadastrado com sucesso!');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin/profissionais']);
  });

  it('salvar() deve exibir alerta quando formulário inválido', () => {
    spyOn(window, 'alert');

    component.cadastroForm.setValue({
      nome: '',
      email: '',
      senha: '',
      especialidade: '',
      tipo: '',
      registro: ''
    });

    component.salvar();

    expect(window.alert).toHaveBeenCalledWith('Preencha todos os campos obrigatórios!');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
