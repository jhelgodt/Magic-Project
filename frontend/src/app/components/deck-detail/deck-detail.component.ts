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
  bulkCardInput: string = "";

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
    if (!this.searchQuery) return;

    this.cardService.searchScryfall(this.searchQuery).subscribe({
      next: (response) => {
        this.searchResults = response.data || []; // Scryfall returnerar .data[]
      },
      error: (err) => {
        console.error("Failed to search Scryfall:", err);
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
      this.deckService.addCardToDeck(deckId, this.selectedCard).subscribe({
        next: (data) => {
          this.deck = data;
          this.searchResults = [];
          this.searchQuery = "";
          this.selectedCard = null;
        },
        error: (err) => {
          console.error("Failed to add card to deck:", err);
        },
      });
    }
  }

  bulkAddCards(): void {
    const deckId = this.route.snapshot.paramMap.get("id");
    if (!deckId || !this.bulkCardInput.trim()) return;

    const lines = this.bulkCardInput.trim().split("\n");
    const queries = lines
      .map((line) => {
        const match = line.match(/^\s*\d+x?\s+(.*)/i);
        return match ? match[1].trim() : null;
      })
      .filter(Boolean);

    // Hämta alla kort i följd (kan även parallelliseras)
    const addedCards: any[] = [];
    const failedCards: string[] = [];

    const processNext = (i: number) => {
      if (i >= queries.length) {
        if (addedCards.length > 0) {
          // Skicka till backend när alla är hämtade
          this.deckService.bulkAddCardsToDeck(deckId!, addedCards).subscribe({
            next: (data) => {
              this.deck = data;
              this.bulkCardInput = "";
            },
            error: (err) => console.error("Failed to add cards:", err),
          });
        }
        if (failedCards.length > 0) {
          console.warn("Some cards could not be found:", failedCards);
        }
        return;
      }

      this.cardService.searchScryfall(queries[i]!).subscribe({
        next: (res) => {
          const card = res.data?.[0];
          if (card) addedCards.push(card);
          else if (queries[i] !== null) failedCards.push(queries[i]!);
          processNext(i + 1);
        },
        error: () => {
          if (queries[i] !== null) {
            failedCards.push(queries[i]!);
          }
          processNext(i + 1);
        },
      });
    };

    processNext(0);
  }
}
