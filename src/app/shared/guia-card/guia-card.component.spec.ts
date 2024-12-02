import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaCardComponent } from './guia-card.component';

describe('GuiaCardComponent', () => {
  let component: GuiaCardComponent;
  let fixture: ComponentFixture<GuiaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuiaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuiaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
