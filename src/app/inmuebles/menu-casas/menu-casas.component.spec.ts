import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCasasComponent } from './menu-casas.component';

describe('MenuCasasComponent', () => {
  let component: MenuCasasComponent;
  let fixture: ComponentFixture<MenuCasasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuCasasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCasasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
