import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesHistoricoClinicoComponent } from './informacoes-historico-clinico.component';

describe('InformacoesHistoricoClinicoComponent', () => {
  let component: InformacoesHistoricoClinicoComponent;
  let fixture: ComponentFixture<InformacoesHistoricoClinicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacoesHistoricoClinicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacoesHistoricoClinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
