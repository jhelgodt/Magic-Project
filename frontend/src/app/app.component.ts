import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { DeckBuilderComponent } from "./components/deck-builder/deck-builder.component";
import { CommonModule } from "@angular/common"; // Import CommonModule
import { CardBuilderComponent } from "./components/card-builder/card-builder.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    DeckBuilderComponent,
    CommonModule,
    CardBuilderComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "portfolio2";
}
