import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { DeckBuilderComponent } from "./components/deck-builder/deck-builder.component";
import { DeckDetailComponent } from "./components/deck-detail/deck-detail.component";

export const routes: Routes = [
  { path: "", component: HomeComponent }, // Default route for general information
  { path: "my-decks", component: DeckBuilderComponent }, // Route for the Deck Builder
  { path: "decks/:id", component: DeckDetailComponent }, // Route to show a specific deck
];
