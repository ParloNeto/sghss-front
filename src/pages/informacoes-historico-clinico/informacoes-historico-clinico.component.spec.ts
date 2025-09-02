import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformacoesHistoricoClinicoComponent } from './informacoes-historico-clinico.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

describe('InformacoesHistoricoClinicoComponent', () => {
  let component: InformacoesHistoricoClinicoComponent;
  let fixture: ComponentFixture<InformacoesHistoricoClinicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, InformacoesHistoricoClinicoComponent],
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

    fixture = TestBed.createComponent(InformacoesHistoricoClinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve conter dois registros no histórico por padrão', () => {
    expect(component.historico.length).toBe(2);
  });

  it('deve conter os dados corretos do primeiro registro', () => {
    const registro = component.historico[0];
    expect(registro.profissional).toBe('Dr. Paulo Neto');
    expect(registro.especialidade).toBe('Cardiologia');
    expect(registro.diagnostico).toBe('Hipertensão controlada');
    expect(registro.receita).toContain('Losartana');
  });

  it('deve renderizar receita apenas quando presente', () => {
    component.historico.push({
      data: '20/06/2025',
      profissional: 'Dra. Carla Mendes',
      especialidade: 'Dermatologia',
      diagnostico: 'Dermatite atópica'
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.card');
    const ultimaCard = cards[cards.length - 1];
    const receita = ultimaCard.querySelector('p strong')?.textContent;

    expect(receita).not?.toContain('Receita');
  });
});
