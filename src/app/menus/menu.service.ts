import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuIU } from './menu-iu';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  private menusSubject = new BehaviorSubject<MenuIU[]>([]);
  menus$ = this.menusSubject.asObservable();

  constructor() {
    this.loadMenusFromLocalStorage();
  }

  private loadMenusFromLocalStorage() {
    const menus = localStorage.getItem('menus');
    if (menus) {
      this.menusSubject.next(JSON.parse(menus));
    }
  }

  private saveMenusToLocalStorage() {
    localStorage.setItem('menus', JSON.stringify(this.menusSubject.getValue()));
  }

  getMenus(): Observable<MenuIU[]> {
    return this.menus$;
  }

  addMenu(menu: MenuIU): void {
    const menus = this.menusSubject.getValue();
    this.menusSubject.next([...menus, menu]);
    this.saveMenusToLocalStorage();
  }

  updateMenu(updatedMenu: MenuIU): void {
    const menus = this.menusSubject.getValue().map((menu) =>
      menu.id === updatedMenu.id ? updatedMenu : menu
    );
    this.menusSubject.next(menus);
    this.saveMenusToLocalStorage();
  }

  deleteMenu(id: number): void {
    const menus = this.menusSubject.getValue().filter((menu) => menu.id !== id);
    this.menusSubject.next(menus);
    this.saveMenusToLocalStorage();
  }
}
