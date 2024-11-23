import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPqrComponent } from './asignar-pqr.component';

describe('AsignarPqrComponent', () => {
  let component: AsignarPqrComponent;
  let fixture: ComponentFixture<AsignarPqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignarPqrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarPqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
