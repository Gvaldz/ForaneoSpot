import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVendedoresComponent } from './menu-vendedores.component';

describe('MenuVendedoresComponent', () => {
  let component: MenuVendedoresComponent;
  let fixture: ComponentFixture<MenuVendedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuVendedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuVendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
