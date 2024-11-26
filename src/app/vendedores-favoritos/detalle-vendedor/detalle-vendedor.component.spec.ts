import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVendedorComponent } from './detalle-vendedor.component';

describe('DetalleVendedorComponent', () => {
  let component: DetalleVendedorComponent;
  let fixture: ComponentFixture<DetalleVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleVendedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
