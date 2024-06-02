import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionejemplosComponent } from './gestionejemplos.component';

describe('GestionejemplosComponent', () => {
  let component: GestionejemplosComponent;
  let fixture: ComponentFixture<GestionejemplosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionejemplosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionejemplosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
