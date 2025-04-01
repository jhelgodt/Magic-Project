import { bootstrapApplication } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter } from "@angular/router"; // Import provideRouter
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Provide HttpClient globally
    provideRouter(routes), // Provide the router
  ],
}).catch((err) => console.error(err));

console.log("Routes:", routes);
