import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDetalheComponent } from './consulta-detalhe.component';

describe('ConsultaDetalheComponent', () => {
  let component: ConsultaDetalheComponent;
  let fixture: ComponentFixture<ConsultaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaDetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
