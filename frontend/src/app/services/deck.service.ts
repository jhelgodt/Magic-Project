import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DeckService {
  private API_URL: string;

  constructor(private http: HttpClient, @Inject("API_URL") apiUrl: string) {
    this.API_URL = `${apiUrl}/api/v1`;
  }

  // Fetch all decks (auth required)
  getAllDecks(): Observable<any> {
    return this.http.get(`${this.API_URL}/decks`, {
      withCredentials: true,
    });
  }

  // Get a deck by ID (auth required)
  getDeckById(deckId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/decks/${deckId}`, {
      withCredentials: true,
    });
  }

  // Create a new deck (auth required)
  createDeck(deckData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/decks`, deckData, {
      withCredentials: true,
    });
  }

  // Update a deck (auth required)
  updateDeck(deckId: string, deckData: any): Observable<any> {
    return this.http.put(`${this.API_URL}/decks/${deckId}`, deckData, {
      withCredentials: true,
    });
  }

  // Delete a deck (auth required)
  deleteDeck(deckId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/decks/${deckId}`, {
      withCredentials: true,
    });
  }

  // Add a card to a deck (auth required)
  addCardToDeck(deckId: string, cardId: string): Observable<any> {
    return this.http.put(
      `${this.API_URL}/decks/${deckId}/add-card`,
      { cardId },
      {
        withCredentials: true,
      }
    );
  }
}
