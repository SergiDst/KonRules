import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerArticulosComponent } from './ver-articulos.component';

describe('VerArticulosComponent', () => {
  let component: VerArticulosComponent;
  let fixture: ComponentFixture<VerArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerArticulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
