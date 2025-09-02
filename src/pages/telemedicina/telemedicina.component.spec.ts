import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelemedicinaComponent } from './telemedicina.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

describe('TelemedicinaComponent', () => {
  let component: TelemedicinaComponent;
  let fixture: ComponentFixture<TelemedicinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TelemedicinaComponent],
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

    fixture = TestBed.createComponent(TelemedicinaComponent);
    component = fixture.componentInstance;

    // Mock de dados
    component.pacientes = ['Paciente 1', 'Paciente 2'];
    component.profissionais = ['Dr. João', 'Dra. Maria'];
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('formulário deve ser inválido quando vazio', () => {
    expect(component.teleForm.valid).toBeFalse();
  });

  it('formulário deve ser válido quando todos os campos obrigatórios preenchidos', () => {
    component.teleForm.setValue({
      paciente: 'Paciente 1',
      profissional: 'Dr. João',
      dataHora: '2025-09-01T10:00',
      link: 'https://consulta.online/abc123'
    });
    expect(component.teleForm.valid).toBeTrue();
  });

  it('iniciarConsulta() deve exibir alert quando formulário válido', () => {
    spyOn(window, 'alert');
    component.teleForm.setValue({
      paciente: 'Paciente 2',
      profissional: 'Dra. Maria',
      dataHora: '2025-09-02T15:00',
      link: 'https://consulta.online/xyz789'
    });

    component.iniciarConsulta();

    expect(window.alert).toHaveBeenCalledWith('Consulta iniciada com sucesso!');
  });

  it('iniciarConsulta() deve exibir alert de erro quando formulário inválido', () => {
    spyOn(window, 'alert');
    component.teleForm.setValue({
      paciente: '',
      profissional: '',
      dataHora: '',
      link: ''
    });

    component.iniciarConsulta();

    expect(window.alert).toHaveBeenCalledWith('Preencha todos os campos obrigatórios.');
  });
});
