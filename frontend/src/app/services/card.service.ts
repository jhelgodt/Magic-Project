import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root", // Makes the service available application-wide
})
export class CardService {
  private API_URL: string;

  constructor(
    private http: HttpClient,
    @Inject("API_URL") apiUrl: string // Inject the API_URL from app.config.ts
  ) {
    this.API_URL = `${apiUrl}/api/v1`; // Add /api/v1 to the base URL
  }

  // Search for cards in the database
  searchCards(query: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.API_URL}/cards/search?query=${encodeURIComponent(query)}`
    );
  }

  // Add a card from Scryfall to the database
  addCardFromScryfall(cardName: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/cards/scryfall`, { cardName });
  }

  // Fetch a card by name from Scryfall
  getCardByName(cardName: string): Observable<any> {
    const url = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(
      cardName
    )}`;
    return this.http.get<any>(url);
  }

  // Fetch all cards
  getAllCards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/cards`);
  }

  // Fetch a single card by ID
  getCardById(cardId: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/cards/${cardId}`);
  }

  // Create a new card
  createCard(card: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/cards`, card);
  }

  // Update a card
  updateCard(cardId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/cards/${cardId}`, updatedData);
  }

  // Delete a card
  deleteCard(cardId: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/cards/${cardId}`);
  }
}
