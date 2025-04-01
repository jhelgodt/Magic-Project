import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../app.config";

@Component({
  selector: "app-deck-detail",
  standalone: true,
  imports: [],
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
      this.http.get(`${API_URL}/decks/${deckId}`).subscribe((data) => {
        console.log("Deck fetched from backend:", data); // Log the fetched deck
        this.deck = data;
      });
    }
  }
}
