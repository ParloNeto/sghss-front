import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { of, throwError } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { LoginComponent } from "./login.component";
import { LoginService } from "./login.service";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLoginService: jasmine.SpyObj<LoginService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    mockLoginService = jasmine.createSpyObj('LoginService', ['logar']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: LoginService, useValue: mockLoginService },
        { provide: AuthService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve manter formulário inválido se campos estiverem vazios', () => {
    expect(component.loginUser.valid).toBeFalse();
  });

  it('deve logar com sucesso e navegar para /home', fakeAsync(() => {
    const tokenFake = 'fake-token';
    mockLoginService.logar.and.returnValue(of({ token: tokenFake }));

    component.loginUser.setValue({ login: 'usuario', password: '123456' });
    component.clickEntrar();
    tick();

    expect(localStorage.getItem('token')).toBe(tokenFake);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/home');
  }));

  it('deve setar erroLogin = true quando login falhar', fakeAsync(() => {
    mockLoginService.logar.and.returnValue(throwError(() => new Error('Falha')));

    component.loginUser.setValue({ login: 'usuario', password: 'errado' });
    component.clickEntrar();
    tick();

    expect(component.erroLogin).toBeTrue();
  }));

  it('deve exibir mensagem de erro no template quando erroLogin = true', () => {
    component.erroLogin = true;
    fixture.detectChanges();

    const msgErro = fixture.debugElement.query(By.css('.erro-msg')).nativeElement;
    expect(msgErro.textContent).toContain('Credenciais inválidas');
  });
});
