import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelatoriosComponent } from './relatorios.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

describe('RelatoriosComponent', () => {
  let component: RelatoriosComponent;
  let fixture: ComponentFixture<RelatoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatoriosComponent],
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

    fixture = TestBed.createComponent(RelatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o título "Relatórios"', () => {
    const h2Element: HTMLElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(h2Element.textContent).toContain('Relatórios');
  });

  it('deve renderizar a quantidade correta de relatórios', () => {
    const cards = fixture.debugElement.queryAll(By.css('.card'));
    expect(cards.length).toBe(component.relatorios.length);
  });

  it('deve exibir os títulos e valores dos relatórios corretamente', () => {
    const cards = fixture.debugElement.queryAll(By.css('.card'));

    cards.forEach((card, index) => {
      const titulo = card.query(By.css('h3')).nativeElement.textContent;
      const valor = card.query(By.css('p')).nativeElement.textContent;

      expect(titulo).toContain(component.relatorios[index].titulo);
      expect(valor).toContain(component.relatorios[index].valor.toString());
    });
  });

  it('deve chamar exportarPDF ao clicar no botão', () => {
    spyOn(component, 'exportarPDF');
    const botao = fixture.debugElement.query(By.css('.btn')).nativeElement;
    botao.click();
    expect(component.exportarPDF).toHaveBeenCalled();
  });
});
