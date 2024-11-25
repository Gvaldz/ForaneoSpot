import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Asegúrate de importar Router
import { MenuIU } from '../menu-iu';
import { MenusService } from '../menu.service';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css'],
})
export class MenuFormComponent implements OnInit {
  menuTemp: MenuIU = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: null,
  };
  isEditMode = false;

  constructor(
    private menusService: MenusService,
    private route: ActivatedRoute,
    private router: Router 
  ) {}

  ngOnInit(): void {
    const menuId = +this.route.snapshot.paramMap.get('id')!;
    if (menuId) {
      this.isEditMode = true;
      this.menusService.getMenus().subscribe((menus: MenuIU[]) => {
        this.menuTemp = menus.find(menu => menu.id === menuId)!;
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.menusService.updateMenu(this.menuTemp);
      this.router.navigate(['/comida']); 
    } else {
      this.menuTemp.id = Date.now(); 
      this.menusService.addMenu(this.menuTemp);
      this.router.navigate(['/comida']); 
    }
    this.resetForm();
  }

  resetForm() {
    this.menuTemp = {
      id: 0,
      nombre: '',
      descripcion: '',
      precio: null,
    };
    this.isEditMode = false;
  }
}
