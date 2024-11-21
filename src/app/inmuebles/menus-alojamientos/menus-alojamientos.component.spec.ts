import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusAlojamientosComponent } from './menus-alojamientos.component';

describe('MenusAlojamientosComponent', () => {
  let component: MenusAlojamientosComponent;
  let fixture: ComponentFixture<MenusAlojamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenusAlojamientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenusAlojamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
