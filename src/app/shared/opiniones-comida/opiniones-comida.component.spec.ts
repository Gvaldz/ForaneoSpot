import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionesComidaComponent } from './opiniones-comida.component';

describe('OpinionesComidaComponent', () => {
  let component: OpinionesComidaComponent;
  let fixture: ComponentFixture<OpinionesComidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpinionesComidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpinionesComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
