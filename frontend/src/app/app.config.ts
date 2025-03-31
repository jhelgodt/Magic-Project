import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";

export const API_URL = "https://magic-project-ph0g.onrender.com/api/v1";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: "API_URL", useValue: API_URL }, // Add API_URL as a provider
  ],
};
