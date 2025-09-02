import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastrarConsultasComponent } from './cadastrar-consultas.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

describe('CadastrarConsultasComponent', () => {
  let component: CadastrarConsultasComponent;
  let fixture: ComponentFixture<CadastrarConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CadastrarConsultasComponent],
      providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {},
          params: [],
          queryParams: [],
        }
      }
    ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('formulário deve ser inválido quando vazio', () => {
    expect(component.agendamentoForm.valid).toBeFalse();
  });

  it('formulário deve ser válido quando todos os campos estiverem preenchidos', () => {
    component.agendamentoForm.setValue({
      especialidade: 'Cardiologia',
      profissional: 'Dr. João Silva',
      tipoConsulta: 'Consulta de rotina',
      dataHora: '2025-09-01T10:00'
    });

    expect(component.agendamentoForm.valid).toBeTrue();
  });

  it('confirmar() deve exibir alert e resetar formulário quando válido', () => {
    spyOn(window, 'alert');
    component.agendamentoForm.setValue({
      especialidade: 'Dermatologia',
      profissional: 'Dra. Maria Souza',
      tipoConsulta: 'Consulta dermatológica',
      dataHora: '2025-09-02T14:30'
    });

    component.confirmar();

    expect(window.alert).toHaveBeenCalledWith('Consulta agendada com sucesso!');
    expect(component.agendamentoForm.value).toEqual({
      especialidade: null,
      profissional: null,
      tipoConsulta: null,
      dataHora: null
    });
  });

  it('confirmar() deve exibir alert de erro quando formulário inválido', () => {
    spyOn(window, 'alert');
    component.agendamentoForm.setValue({
      especialidade: '',
      profissional: '',
      tipoConsulta: '',
      dataHora: ''
    });

    component.confirmar();

    expect(window.alert).toHaveBeenCalledWith('Preencha todos os campos obrigatórios.');
  });
});
