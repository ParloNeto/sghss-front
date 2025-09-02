import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoricoClinicoComponent } from './historico-clinico.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

describe('HistoricoClinicoComponent', () => {
  let component: HistoricoClinicoComponent;
  let fixture: ComponentFixture<HistoricoClinicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, HistoricoClinicoComponent],
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

    fixture = TestBed.createComponent(HistoricoClinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário com campos vazios', () => {
    const form = component.historicoForm;
    expect(form).toBeDefined();
    expect(form.get('paciente')?.value).toBe('');
    expect(form.get('condicoes')?.value).toBe('');
    expect(form.get('medicamentos')?.value).toBe('');
    expect(form.get('alergias')?.value).toBe('');
    expect(form.get('observacoes')?.value).toBe('');
  });

  it('deve considerar o formulário inválido se o paciente não for selecionado', () => {
    component.historicoForm.patchValue({
      paciente: '',
      condicoes: 'Diabetes',
      medicamentos: 'Metformina',
      alergias: 'Nenhuma',
      observacoes: 'Paciente estável'
    });
    expect(component.historicoForm.valid).toBeFalse();
  });

  it('deve considerar o formulário válido com paciente selecionado', () => {
    component.historicoForm.patchValue({
      paciente: 'João Silva',
      condicoes: 'Hipertensão',
      medicamentos: 'Losartana',
      alergias: 'Alergia a penicilina',
      observacoes: 'Monitorar pressão semanalmente'
    });
    expect(component.historicoForm.valid).toBeTrue();
  });

  it('deve chamar alert de sucesso e resetar o formulário ao salvar com dados válidos', () => {
    spyOn(window, 'alert');
    spyOn(console, 'log');

    component.historicoForm.patchValue({
      paciente: 'Maria Souza',
      condicoes: 'Asma',
      medicamentos: 'Salbutamol',
      alergias: '',
      observacoes: ''
    });

    component.salvar();

    expect(window.alert).toHaveBeenCalledWith('Histórico clínico registrado com sucesso!');
    expect(console.log).toHaveBeenCalledWith('Histórico clínico salvo:', jasmine.any(Object));
    expect(component.historicoForm.get('paciente')?.value).toBe('');
  });

  it('deve exibir alerta de erro se o paciente não for selecionado ao salvar', () => {
    spyOn(window, 'alert');

    component.historicoForm.patchValue({
      paciente: '',
      condicoes: 'Diabetes',
      medicamentos: 'Metformina',
      alergias: '',
      observacoes: ''
    });

    component.salvar();

    expect(window.alert).toHaveBeenCalledWith('Selecione um paciente para continuar.');
  });
});
