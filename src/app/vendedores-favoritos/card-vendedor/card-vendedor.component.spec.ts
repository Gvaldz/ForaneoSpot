import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVendedorComponent } from './card-vendedor.component';

describe('CardVendedorComponent', () => {
  let component: CardVendedorComponent;
  let fixture: ComponentFixture<CardVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardVendedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
