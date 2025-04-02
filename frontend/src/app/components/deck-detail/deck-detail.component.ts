import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../app.config";
import { CommonModule } from "@angular/common"; // Import CommonModule
import { FormsModule } from "@angular/forms"; // Import FormsModule

@Component({
  selector: "app-deck-detail",
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule to the imports array
  templateUrl: "./deck-detail.component.html",
  styleUrls: ["./deck-detail.component.scss"],
})
export class DeckDetailComponent implements OnInit {
  deck: any = null; // Store the deck details

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const deckId = this.route.snapshot.paramMap.get("id");
    console.log("Deck ID from route:", deckId); // Log the deck ID
    if (deckId) {
      this.http.get(`${API_URL}/decks/${deckId}`).subscribe({
        next: (data) => {
          console.log("Deck fetched from backend:", data);
          this.deck = data;
          console.log("Cards in deck:", this.deck.cards); // Log the cards array
        },
        error: (err) => {
          console.error("Error fetching deck:", err);
        },
      });
    }
  }

  newCardId: string = "";

  addCard(): void {
    this.http
      .put(`${API_URL}/decks/${this.deck._id}/add-card`, {
        cardId: this.newCardId,
      })
      .subscribe({
        next: (updatedDeck) => {
          console.log("Card added to deck:", updatedDeck);
          this.deck = updatedDeck; // Update the deck with the new card
          this.newCardId = ""; // Reset the input field
        },
        error: (err) => {
          console.error("Error adding card to deck:", err);
        },
      });
  }
}
