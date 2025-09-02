import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceitasDigitaisComponent } from './receitas-digitais.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

describe('ReceitasDigitaisComponent', () => {
  let component: ReceitasDigitaisComponent;
  let fixture: ComponentFixture<ReceitasDigitaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ReceitasDigitaisComponent],
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

    fixture = TestBed.createComponent(ReceitasDigitaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve adicionar uma nova receita válida à lista', () => {
    component.novaReceita = {
      paciente: 'João Silva',
      medicamento: 'Paracetamol 500mg',
      posologia: '1 comprimido a cada 8h',
      observacoes: 'Tomar com água',
      data: new Date().toLocaleDateString()
    };

    const receitasAntes = component.receitas.length;
    component.salvarReceita();
    const receitasDepois = component.receitas.length;

    expect(receitasDepois).toBe(receitasAntes + 1);
    expect(component.receitas[receitasDepois - 1].paciente).toBe('João Silva');
  });

  it('não deve adicionar receita se campos obrigatórios estiverem vazios', () => {
    component.novaReceita = {
      paciente: '',
      medicamento: '',
      posologia: '',
      observacoes: '',
      data: new Date().toLocaleDateString()
    };

    const receitasAntes = component.receitas.length;
    spyOn(window, 'alert');
    component.salvarReceita();
    const receitasDepois = component.receitas.length;

    expect(receitasDepois).toBe(receitasAntes);
    expect(window.alert).toHaveBeenCalledWith('Preencha os campos obrigatórios.');
  });

  it('deve limpar o formulário após salvar uma receita válida', () => {
    component.novaReceita = {
      paciente: 'Ana Costa',
      medicamento: 'Ibuprofeno 200mg',
      posologia: '1 comprimido após o almoço',
      observacoes: 'Evitar em jejum',
      data: new Date().toLocaleDateString()
    };

    component.salvarReceita();

    expect(component.novaReceita.paciente).toBe('');
    expect(component.novaReceita.medicamento).toBe('');
    expect(component.novaReceita.posologia).toBe('');
    expect(component.novaReceita.observacoes).toBe('');
  });
});
