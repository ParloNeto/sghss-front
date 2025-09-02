import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService: any;

  beforeEach(async () => {
    mockAuthService = {
      getUserName: jasmine.createSpy('getUserName').and.returnValue('Paulo Neto')
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HeaderComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve obter o nome do usuário do AuthService', () => {
    expect(mockAuthService.getUserName).toHaveBeenCalled();
    expect(component.nome).toBe('Paulo Neto');
  });

  it('deve exibir o nome no template', () => {
    const pElement = fixture.debugElement.query(By.css('.message-user p:last-child')).nativeElement;
    expect(pElement.textContent).toBe('Paulo Neto');
  });
});
