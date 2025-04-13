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

  getPublicDecks(): Observable<any> {
    return this.http.get(`${this.API_URL}/decks/public`, {
      withCredentials: true,
    });
  }

  getAllDecks(): Observable<any> {
    return this.http.get(`${this.API_URL}/decks`, {
      withCredentials: true,
    });
  }

  getDeckById(deckId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/decks/${deckId}`, {
      withCredentials: true,
    });
  }

  createDeck(deckData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/decks`, deckData, {
      withCredentials: true,
    });
  }

  updateDeck(deckId: string, deckData: any): Observable<any> {
    return this.http.put(`${this.API_URL}/decks/${deckId}`, deckData, {
      withCredentials: true,
    });
  }

  deleteDeck(deckId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/decks/${deckId}`, {
      withCredentials: true,
    });
  }

  // ✅ Skicka hela kortobjektet till backend istället för bara ett ID
  addCardToDeck(deckId: string, card: any): Observable<any> {
    return this.http.put(
      `${this.API_URL}/decks/${deckId}/add-card`,
      { card },
      {
        withCredentials: true,
      }
    );
  }
  bulkAddCardsToDeck(deckId: string, cards: any[]): Observable<any> {
    return this.http.put(
      `${this.API_URL}/decks/${deckId}/add-cards`,
      { cards },
      {
        withCredentials: true,
      }
    );
  }
}
