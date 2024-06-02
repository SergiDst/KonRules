import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  title = 'Zoológico';
  user = 'Usuario';
  admin : String | null = '';

  constructor(private router: Router) {
  }
  ngOnInit(): void {
    this.admin = localStorage.getItem('admin');
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("admin");
    this.router.navigate(['/inicio']);
    
  }
}

