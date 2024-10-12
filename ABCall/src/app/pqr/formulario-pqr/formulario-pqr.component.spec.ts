import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPqrComponent } from './formulario-pqr.component';

describe('FormularioPqrComponent', () => {
  let component: FormularioPqrComponent;
  let fixture: ComponentFixture<FormularioPqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioPqrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioPqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
