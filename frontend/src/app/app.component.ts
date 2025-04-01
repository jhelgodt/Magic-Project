import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HeroComponent } from "./components/hero/hero.component";
import { ProfessionalJourneyComponent } from "./components/professional-journey/professional-journey.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { ConnectComponent } from "./components/connect/connect.component";
import { DeckBuilderComponent } from "./components/deck-builder/deck-builder.component";
import { CommonModule } from "@angular/common"; // Import CommonModule
import { DebugComponent } from "./components/debug/debug.component";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    HeroComponent,
    ProfessionalJourneyComponent,
    ProjectsComponent,
    ConnectComponent,
    DeckBuilderComponent,
    CommonModule,
    DebugComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "portfolio2";
}
