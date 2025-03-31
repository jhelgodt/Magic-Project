import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { provideHttpClient } from "@angular/common/http";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    {
      provide: "API_URL",
      useValue: "https://magic-project-ph0g.onrender.com/api/v1",
    }, // Replace with your actual API URL
  ],
}).catch((err) => console.error(err));
