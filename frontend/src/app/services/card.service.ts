import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "../app.config";

@Injectable({
  providedIn: "root", // Makes the service available application-wide
})
export class CardService {
  constructor(private http: HttpClient) {}

  // Add a card from Scryfall to the database
  addCardFromScryfall(cardName: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/cards/scryfall`, { cardName });
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
    return this.http.get<any[]>(`${API_URL}/cards`);
  }

  // Fetch a single card by ID
  getCardById(cardId: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/cards/${cardId}`);
  }

  // Create a new card
  createCard(card: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/cards`, card);
  }

  // Update a card
  updateCard(cardId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/cards/${cardId}`, updatedData);
  }

  // Delete a card
  deleteCard(cardId: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/cards/${cardId}`);
  }
}
