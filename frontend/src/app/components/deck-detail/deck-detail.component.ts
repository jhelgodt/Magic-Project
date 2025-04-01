import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../app.config";
import { CommonModule } from "@angular/common"; // Import CommonModule

@Component({
  selector: "app-deck-detail",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./deck-detail.component.html",
  styleUrls: ["./deck-detail.component.scss"],
})
export class DeckDetailComponent implements OnInit {
  deck: any = null; // Store the deck details

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string // Inject the API_URL token
  ) {}

  ngOnInit(): void {
    const deckId = this.route.snapshot.paramMap.get("id");
    console.log("Deck ID from route:", deckId); // Log the deck ID
    if (deckId) {
      this.http.get(`${this.apiUrl}/decks/${deckId}`).subscribe({
        next: (data) => {
          console.log("Deck fetched from backend:", data);
          this.deck = data;
        },
        error: (err) => {
          console.error("Error fetching deck:", err);
        },
      });
    }
  }
}
