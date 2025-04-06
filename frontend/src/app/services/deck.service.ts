import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DeckService {
  private API_URL: string;

  constructor(
    private http: HttpClient,
    @Inject("API_URL") apiUrl: string // Inject the API_URL from app.config.ts
  ) {
    this.API_URL = `${apiUrl}/api/v1`; // Add /api/v1 to the base URL
  }

  // Fetch all decks
  getAllDecks(): Observable<any> {
    return this.http.get(`${this.API_URL}/decks`);
  }

  // Get a deck by ID
  getDeckById(deckId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/decks/${deckId}`);
  }

  // Create a new deck
  createDeck(deckData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/decks`, deckData);
  }

  // Update a deck
  updateDeck(deckId: string, deckData: any): Observable<any> {
    return this.http.put(`${this.API_URL}/decks/${deckId}`, deckData);
  }

  // Delete a deck
  deleteDeck(deckId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/decks/${deckId}`);
  }

  // Add a card to a deck
  addCardToDeck(deckId: string, cardId: string): Observable<any> {
    return this.http.post(`${this.API_URL}/decks/${deckId}/cards`, { cardId });
  }
}
