import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEdificiosComponent } from './menu-edificios.component';

describe('MenuEdificiosComponent', () => {
  let component: MenuEdificiosComponent;
  let fixture: ComponentFixture<MenuEdificiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuEdificiosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuEdificiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
