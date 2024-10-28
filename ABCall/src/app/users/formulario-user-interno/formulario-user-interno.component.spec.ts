import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioUserInternoComponent } from './formulario-user-interno.component';

describe('FormularioUserInternoComponent', () => {
  let component: FormularioUserInternoComponent;
  let fixture: ComponentFixture<FormularioUserInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioUserInternoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioUserInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
