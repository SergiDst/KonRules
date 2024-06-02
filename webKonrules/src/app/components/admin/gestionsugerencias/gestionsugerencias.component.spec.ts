import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionsugerenciasComponent } from './gestionsugerencias.component';

describe('GestionsugerenciasComponent', () => {
  let component: GestionsugerenciasComponent;
  let fixture: ComponentFixture<GestionsugerenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionsugerenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionsugerenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
