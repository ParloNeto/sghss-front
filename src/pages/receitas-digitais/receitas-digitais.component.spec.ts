import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitasDigitaisComponent } from './receitas-digitais.component';

describe('ReceitasDigitaisComponent', () => {
  let component: ReceitasDigitaisComponent;
  let fixture: ComponentFixture<ReceitasDigitaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceitasDigitaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceitasDigitaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
