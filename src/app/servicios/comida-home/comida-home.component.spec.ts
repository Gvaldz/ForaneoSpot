import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComidaHomeComponent } from './comida-home.component';

describe('ComidaHomeComponent', () => {
  let component: ComidaHomeComponent;
  let fixture: ComponentFixture<ComidaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComidaHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComidaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
