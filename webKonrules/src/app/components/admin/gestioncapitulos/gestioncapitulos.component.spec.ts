import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioncapitulosComponent } from './gestioncapitulos.component';

describe('GestioncapitulosComponent', () => {
  let component: GestioncapitulosComponent;
  let fixture: ComponentFixture<GestioncapitulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestioncapitulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestioncapitulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
