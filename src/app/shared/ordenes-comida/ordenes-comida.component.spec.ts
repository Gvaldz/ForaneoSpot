import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesComidaComponent } from './ordenes-comida.component';

describe('OrdenesComidaComponent', () => {
  let component: OrdenesComidaComponent;
  let fixture: ComponentFixture<OrdenesComidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdenesComidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenesComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
