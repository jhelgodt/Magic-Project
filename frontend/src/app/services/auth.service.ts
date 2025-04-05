import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private backendUrl = "http://localhost:5001"; // Update this for production

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
