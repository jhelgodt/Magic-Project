import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "../app.config";

@Injectable({
  providedIn: "root", // Makes the service available application-wide
})
export class DeckService {
  constructor(private http: HttpClient) {}

  // Fetch all decks
  getAllDecks(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/decks`);
  }

  // Fetch a single deck by ID
  getDeckById(deckId: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/decks/${deckId}`);
  }

  // Create a new deck
  createDeck(deck: { name: string; description: string }): Observable<any> {
    return this.http.post<any>(`${API_URL}/decks`, deck);
  }

  // Update a deck
  updateDeck(deckId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/decks/${deckId}`, updatedData);
  }

  // Delete a deck
  deleteDeck(deckId: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/decks/${deckId}`);
  }

  // Add a card to a deck
  addCardToDeck(deckId: string, cardId: string): Observable<any> {
    return this.http.put<any>(`${API_URL}/decks/${deckId}/add-card`, {
      cardId,
    });
  }
}
