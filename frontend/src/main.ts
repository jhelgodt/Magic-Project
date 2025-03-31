import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { provideHttpClient } from "@angular/common/http";
iewwimport { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes), // Add routing
    {
      provide: "API_URL",
      useValue: "https://magic-project-ph0g.onrender.com/api/v1",
    },
  ],
}).catch((err) => console.error(err));
