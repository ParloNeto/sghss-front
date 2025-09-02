import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaDetalheComponent } from './consulta-detalhe.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

describe('ConsultaDetalheComponent', () => {
  let component: ConsultaDetalheComponent;
  let fixture: ComponentFixture<ConsultaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, ConsultaDetalheComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '123'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar a consulta com dados simulados', () => {
    expect(component.consulta).toBeDefined();
    expect(component.consulta.id).toBe('123');
    expect(component.consulta.paciente).toBe('Paulo Neto');
    expect(component.consulta.status).toBe('AGENDADA');
  });

  it('deve cancelar a consulta e alterar o status para CANCELADA', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');
    spyOn(console, 'log');

    component.cancelarConsulta();

    expect(window.confirm).toHaveBeenCalledWith('Deseja realmente cancelar esta consulta?');
    expect(console.log).toHaveBeenCalledWith('Consulta cancelada:', '123');
    expect(window.alert).toHaveBeenCalledWith('Consulta cancelada com sucesso!');
    expect(component.consulta.status).toBe('CANCELADA');
  });

  it('não deve cancelar a consulta se o usuário recusar a confirmação', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.consulta.status = 'AGENDADA';
    component.cancelarConsulta();

    expect(component.consulta.status).toBe('AGENDADA');
  });

  it('deve abrir o link da teleconsulta em uma nova aba', () => {
    spyOn(window, 'open');

    component.entrarTeleconsulta();

    expect(window.open).toHaveBeenCalledWith('https://meet.vidaplus.com/consulta-123', '_blank');
  });

  it('não deve abrir link se não houver link de telemedicina', () => {
    spyOn(window, 'open');

    component.consulta.linkTelemedicina = '';
    component.entrarTeleconsulta();

    expect(window.open).not.toHaveBeenCalled();
  });
});
