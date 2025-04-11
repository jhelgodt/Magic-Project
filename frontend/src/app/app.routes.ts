import { Routes } from "@angular/router";
import { DeckBuilderComponent } from "./components/deck-builder/deck-builder.component";
import { DeckDetailComponent } from "./components/deck-detail/deck-detail.component";

export const routes: Routes = [
  { path: "", component: DeckBuilderComponent }, // Default route to show all decks
  { path: "decks/:id", component: DeckDetailComponent }, // Route to show a specific deck
];
