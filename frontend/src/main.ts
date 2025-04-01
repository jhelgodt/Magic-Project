import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter, withHashLocation } from "@angular/router";
import { routes } from "./app/app.routes";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withHashLocation()), // Add routing
    {
      provide: "API_URL",
      useValue: "https://magic-project-ph0g.onrender.com/api/v1",
    },
  ],
}).catch((err) => console.error(err));

console.log("Routes:", routes);
