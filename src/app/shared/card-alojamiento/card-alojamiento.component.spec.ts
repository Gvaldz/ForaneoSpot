import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAlojamientoComponent } from './card-alojamiento.component';

describe('CardAlojamientoComponent', () => {
  let component: CardAlojamientoComponent;
  let fixture: ComponentFixture<CardAlojamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardAlojamientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAlojamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
