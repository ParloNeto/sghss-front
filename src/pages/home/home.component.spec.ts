import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, JwtPayload } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockAuthService: Partial<AuthService>;
  let router: Router;

  beforeEach(async () => {
    mockAuthService = {
      getUserName: () => 'Paulo',
      getUserData: () => ({ roles: ['ROLE_PACIENTE'] } as JwtPayload)
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HomeComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
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

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve definir nome como "Paulo"', () => {
    expect(component.nome).toBe('Paulo');
  });

  it('deve carregar acesso rápido para paciente', () => {
    expect(component.acessoRapido).toEqual(component.acessoRapidoUser);
  });

  it('deve navegar para a consulta ao chamar abrirConsulta()', () => {
    const spy = spyOn(router, 'navigate');
    component.abrirConsulta('1');
    expect(spy).toHaveBeenCalledWith(['/consultas', '1']);
  });

  it('deve carregar acesso rápido para admin', () => {
    component.usuario = { roles: ['ROLE_ADMIN'] } as JwtPayload;;
    component.ngOnInit();
    expect(component.acessoRapido).toEqual(component.acessoRapidoAdmin);
  });

  it('deve carregar acesso rápido para profissional', () => {
    component.usuario = { roles: ['ROLE_PROFISSIONAL'] } as JwtPayload;
    component.ngOnInit();
    expect(component.acessoRapido).toEqual(component.acessoRapidoProfissional);
  });
});
