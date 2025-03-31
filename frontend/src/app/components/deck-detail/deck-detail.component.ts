import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

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
    const deckId = this.route.snapshot.paramMap.get("id"); // Get deck ID from route
    if (deckId) {
      this.http.get(`/api/v1/decks/${deckId}`).subscribe((data) => {
        this.deck = data;
      });
    }
  }
}
