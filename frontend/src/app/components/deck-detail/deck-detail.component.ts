import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DeckService } from "../../services/deck.service";
import { CommonModule } from "@angular/common"; // Import CommonModule
import { FormsModule } from "@angular/forms"; // Import FormsModule

@Component({
  selector: "app-deck-detail",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./deck-detail.component.html",
  styleUrls: ["./deck-detail.component.scss"],
})
export class DeckDetailComponent implements OnInit {
  deck: any;
  newCardId: string = "";

  constructor(
    private deckService: DeckService,
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

  addCard(): void {
    const deckId = this.route.snapshot.paramMap.get("id");
    if (deckId) {
      this.deckService.addCardToDeck(deckId, this.newCardId).subscribe({
        next: (data) => {
          this.deck = data;
          this.newCardId = ""; // Reset input
        },
        error: (err) => {
          console.error("Failed to add card to deck:", err);
        },
      });
    }
  }
}
