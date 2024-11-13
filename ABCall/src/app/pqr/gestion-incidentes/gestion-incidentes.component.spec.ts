import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionIncidentesComponent } from './gestion-incidentes.component';

describe('GestionIncidentesComponent', () => {
  let component: GestionIncidentesComponent;
  let fixture: ComponentFixture<GestionIncidentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionIncidentesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionIncidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
