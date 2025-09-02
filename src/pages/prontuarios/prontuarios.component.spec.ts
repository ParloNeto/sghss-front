import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProntuariosComponent } from './prontuarios.component';
import { ActivatedRoute } from '@angular/router';

describe('ProntuariosComponent', () => {
  let component: ProntuariosComponent;
  let fixture: ComponentFixture<ProntuariosComponent>;

  beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [ProntuariosComponent, FormsModule],
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

  fixture = TestBed.createComponent(ProntuariosComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
});


    it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('não deve adicionar anotação se estiver vazia ou só com espaços', () => {
    const paciente = component.prontuarios[2]; // Fernanda Silva
    component.selecionarProntuario(paciente);
    const anotacoesAntes = [...paciente.anotacoes];

    component.novaAnotacao = '   ';
    component.adicionarAnotacao();

    expect(component.prontuarioSelecionado?.anotacoes).toEqual(anotacoesAntes);
  });

  it('não deve adicionar anotação se nenhum prontuário estiver selecionado', () => {
    component.novaAnotacao = 'Teste sem seleção';
    component.adicionarAnotacao();

    const anotacoesTotais = component.prontuarios.flatMap(p => p.anotacoes);
    expect(anotacoesTotais).not.toContain('Teste sem seleção');
  });

  it('deve adicionar uma nova anotação ao prontuário selecionado', () => {
    const paciente = component.prontuarios[0]; // Maria Oliveira
    component.selecionarProntuario(paciente);
    component.novaAnotacao = 'Retorno marcado para 15/09/2025';
    component.adicionarAnotacao();

    expect(component.prontuarioSelecionado?.anotacoes).toContain('Retorno marcado para 15/09/2025');
    expect(component.novaAnotacao).toBe('');
  });

    it('deve selecionar um prontuário corretamente', () => {
    const paciente = component.prontuarios[1]; // Carlos Souza
    component.selecionarProntuario(paciente);
    expect(component.prontuarioSelecionado).toEqual(paciente);
  });


});
