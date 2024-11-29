import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioOpinionComponent } from './formulario-opinion.component';

describe('FormularioOpinionComponent', () => {
  let component: FormularioOpinionComponent;
  let fixture: ComponentFixture<FormularioOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioOpinionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
