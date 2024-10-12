import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadicarPQRClienteComponent } from './radicar-pqrcliente.component';

describe('RadicarPQRClienteComponent', () => {
  let component: RadicarPQRClienteComponent;
  let fixture: ComponentFixture<RadicarPQRClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadicarPQRClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadicarPQRClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
