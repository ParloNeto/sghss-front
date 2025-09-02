import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternacoesComponent } from './internacoes.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

describe('InternacoesComponent', () => {
  let component: InternacoesComponent;
  let fixture: ComponentFixture<InternacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, InternacoesComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {},
            params: [],
            queryParams: [],
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InternacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve marcar o paciente como "Alta" ao chamar darAlta()', () => {
    const index = 0;
    const paciente = component.internacoes[index].paciente;

    spyOn(window, 'alert');
    component.darAlta(index);

    expect(component.internacoes[index].status).toBe('Alta');
    expect(window.alert).toHaveBeenCalledWith(
      `Paciente ${paciente} recebeu alta!`
    );
  });

  it('não deve alterar pacientes que já estão com status "Alta"', () => {
    const index = 1;
    component.internacoes[index].status = 'Alta';

    spyOn(window, 'alert');
    component.darAlta(index);

    expect(component.internacoes[index].status).toBe('Alta');
    expect(window.alert).toHaveBeenCalledWith(
      `Paciente ${component.internacoes[index].paciente} recebeu alta!`
    );
  });

  it('deve manter o número de internações após dar alta', () => {
    const totalAntes = component.internacoes.length;
    component.darAlta(2);
    const totalDepois = component.internacoes.length;

    expect(totalDepois).toBe(totalAntes);
  });
});
