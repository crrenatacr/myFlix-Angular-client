import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // Control the state of the menu
  isMenuOpen = false;

  // Method to alternate visibility of the menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;  // Alternates the state of the menu
    console.log('Menu toggled:', this.isMenuOpen);  // Verification log
  }
}