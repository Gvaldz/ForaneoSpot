import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComidaComponent } from './menu-comida.component';

describe('MenuComidaComponent', () => {
  let component: MenuComidaComponent;
  let fixture: ComponentFixture<MenuComidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
