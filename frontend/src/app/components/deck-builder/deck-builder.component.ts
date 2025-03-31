import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { API_URL } from "../../app.config";

@Component({
  selector: "app-deck-builder",
  standalone: true,
  imports: [],
  templateUrl: "./deck-builder.component.html",
  styleUrls: ["./deck-builder.component.scss"],
})
export class DeckBuilderComponent implements OnInit {
  decks: any[] = []; // Array to store decks fetched from the backend

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>(`${API_URL}/decks`).subscribe((data) => {
      this.decks = data;
    });
  }

  // Navigate to the deck detail page
  viewDeck(deckId: string): void {
    this.router.navigate(["/decks", deckId]);
  }
}
