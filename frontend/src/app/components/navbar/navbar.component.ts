import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common"; // Import CommonModule

@Component({
  selector: "app-navbar",
  imports: [CommonModule], // Add CommonModule to imports
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false; // Tracks whether the user is logged in
  user: any = null; // Stores user information (e.g., name, profile picture)
  menuOpen = false; // Tracks whether the menu is open or closed

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Check if the user is authenticated when the component initializes
    this.authService.isAuthenticated().subscribe(
      (user) => {
        this.isLoggedIn = true; // User is authenticated
        this.user = user; // Store user information
      },
      (error) => {
        this.isLoggedIn = false; // User is not authenticated
        this.user = null; // Clear user information
      }
    );
  }

  // Redirect to the login route
  login(): void {
    this.authService.login();
  }

  // Redirect to the logout route
  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false; // Reset authentication state
    this.user = null; // Clear user information
  }

  // Toggle the menu open/close state
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  // Close the menu
  closeMenu(): void {
    this.menuOpen = false;
  }
}
