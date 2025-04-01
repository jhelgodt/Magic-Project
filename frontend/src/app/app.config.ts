// src/app/app.config.ts

import {
  ApplicationConfig,
  provideZoneChangeDetection,
  InjectionToken,
  Inject,
  Injectable,
} from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter, withHashLocation } from "@angular/router";
import { routes } from "./app.routes";

// ✅ Skapa en InjectionToken för API_URL
export const API_URL = new InjectionToken<string>("API_URL");

// ✅ Angular application configuration
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    //provideRouter(routes, withHashLocation()),
    {
      provide: API_URL,
      useValue: "https://magic-project-ph0g.onrender.com/api/v1",
    },
  ],
};

// ✅ (Valfri) enkel ApiService för att logga URL vid start
@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(@Inject(API_URL) private apiUrl: string) {
    console.log("Injected API_URL:", this.apiUrl);
  }
}
