import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DeckService } from "../../services/deck.service";
import { CardService } from "../../services/card.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-deck-detail",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./deck-detail.component.html",
  styleUrls: ["./deck-detail.component.scss"],
})
export class DeckDetailComponent implements OnInit {
  deck: any;
  searchQuery: string = ""; // Input for card search
  searchResults: any[] = []; // Store search results
  selectedCard: any = null; // Store the selected card

  constructor(
    private deckService: DeckService,
    private cardService: CardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const deckId = this.route.snapshot.paramMap.get("id");
    if (deckId) {
      this.deckService.getDeckById(deckId).subscribe({
        next: (data) => {
          this.deck = data;
        },
        error: (err) => {
          console.error("Failed to fetch deck:", err);
        },
      });
    }
  }

  // Search for cards in the database
  searchCards(): void {
    if (!this.searchQuery) {
      console.error("Search query is required.");
      return;
    }

    this.cardService.searchCards(this.searchQuery).subscribe({
      next: (data) => {
        this.searchResults = data; // Store the search results
      },
      error: (err) => {
        console.error("Failed to search for cards:", err);
        this.searchResults = [];
      },
    });
  }

  // Add the selected card to the deck
  addCardToDeck(): void {
    if (!this.selectedCard) {
      console.error("No card selected.");
      return;
    }

    const deckId = this.route.snapshot.paramMap.get("id");
    if (deckId) {
      this.deckService.addCardToDeck(deckId, this.selectedCard._id).subscribe({
        next: (data) => {
          this.deck = data; // Update the deck with the new card
          this.searchResults = []; // Clear search results
          this.searchQuery = ""; // Reset input
          this.selectedCard = null; // Reset selected card
        },
        error: (err) => {
          console.error("Failed to add card to deck:", err);
        },
      });
    }
  }
}
