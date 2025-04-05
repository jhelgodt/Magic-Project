import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment"; // Import environment configuration

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private backendUrl = environment.API_URL; // Use the API_URL from the environment file

  constructor(private http: HttpClient) {}

  // Check if the user is authenticated
  isAuthenticated(): Observable<any> {
    return this.http.get(`${this.backendUrl}/auth/user`, {
      withCredentials: true,
    });
  }

  // Logout the user
  logout(): void {
    window.location.href = `${this.backendUrl}/auth/logout`;
  }

  // Redirect to Google login
  login(): void {
    window.location.href = `${this.backendUrl}/auth/google`;
  }
}
