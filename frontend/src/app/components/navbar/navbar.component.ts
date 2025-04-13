import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router"; // ✅ Lägg till detta!

@Component({
  selector: "app-navbar",
  standalone: true, // ✅ Om du använder standalone-komponenter
  imports: [CommonModule, RouterModule], // ✅ Lägg till RouterModule här
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: any = null;
  menuOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(
      (user) => {
        this.isLoggedIn = true;
        this.user = user;
      },
      () => {
        this.isLoggedIn = false;
        this.user = null;
      }
    );
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.user = null;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
