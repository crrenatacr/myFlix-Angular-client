import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // Control the state of the menu
  isMenuOpen = false;

  constructor(private router: Router) {}

  // Method to alternate visibility of the menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Menu toggled:', this.isMenuOpen);
  }

  // Method to logout the user
  logout() {
    // Remove token or user data from localStorage 
    localStorage.removeItem('token');  
    // Redirect to the welcome page
    this.router.navigate(['/welcome']);
    console.log('User logged out and redirected to welcome page');
  }
}