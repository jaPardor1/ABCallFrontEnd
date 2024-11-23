import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarPqrComponent } from './cerrar-pqr.component';

describe('CerrarPqrComponent', () => {
  let component: CerrarPqrComponent;
  let fixture: ComponentFixture<CerrarPqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CerrarPqrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CerrarPqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
