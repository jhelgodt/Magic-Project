import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { API_URL } from "../../app.config";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-deck-builder",
  standalone: true,
  imports: [],
  templateUrl: "./deck-builder.component.html",
  styleUrls: ["./deck-builder.component.scss"],
})
export class DeckBuilderComponent implements OnInit {
  decks: any[] = []; // Array to store decks fetched from the backend

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.http.get<any[]>(`${API_URL}/decks`).subscribe((data) => {
      console.log("Decks fetched from backend:", data); // Log the fetched decks
      this.decks = data;
      setTimeout(() => {
        this.cdr.detectChanges(); // Trigger change detection after a delay
      }, 0);
    });
  }

  // Navigate to the deck detail page
  viewDeck(deckId: string): void {
    console.log("Navigating to deck:", deckId); // Add a log to confirm navigation
    this.router.navigate(["/decks", deckId]);
  }
}
