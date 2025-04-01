import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { routes } from "./app.routes";
import { Inject, Injectable } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter, withHashLocation } from "@angular/router";

export const API_URL = "https://magic-project-ph0g.onrender.com/api/v1";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes, withHashLocation()), // Add routing with hash location
    { provide: "API_URL", useValue: API_URL }, // Add API_URL as a provider
  ],
};
@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(@Inject("API_URL") private apiUrl: string) {
    console.log("Injected API_URL:", this.apiUrl);
  }
}

console.log("All Providers:", appConfig.providers);
