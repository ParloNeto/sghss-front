import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o ano correto e nome da empresa', () => {
    const leftDiv = fixture.debugElement.query(By.css('.footer__left')).nativeElement;
    expect(leftDiv.textContent).toContain('© 2025 VidaPlus');
  });

  it('deve exibir os links do rodapé', () => {
    const links = fixture.debugElement.queryAll(By.css('.footer__nav a'));
    expect(links.length).toBe(3);
    expect(links[0].nativeElement.textContent).toBe('Termos');
    expect(links[1].nativeElement.textContent).toBe('Privacidade');
    expect(links[2].nativeElement.textContent).toBe('Contato');
  });
});
