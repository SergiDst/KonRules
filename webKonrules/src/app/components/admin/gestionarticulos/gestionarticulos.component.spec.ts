import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarticulosComponent } from './gestionarticulos.component';

describe('GestionarticulosComponent', () => {
  let component: GestionarticulosComponent;
  let fixture: ComponentFixture<GestionarticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarticulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
