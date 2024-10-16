import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPqrComponent } from './listado-pqr.component';

describe('ListadoPqrComponent', () => {
  let component: ListadoPqrComponent;
  let fixture: ComponentFixture<ListadoPqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoPqrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
