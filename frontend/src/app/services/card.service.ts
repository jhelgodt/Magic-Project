import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CardService {
  constructor(private http: HttpClient) {}

  /**
   * 🔍 Söker efter kort med valfri query.
   * Returnerar upp till 175 kort från Scryfall som matchar texten.
   */
  searchScryfall(query: string): Observable<any> {
    const url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(
      query
    )}`;
    return this.http.get<any>(url);
  }

  /**
   * 🧠 Autocomplete för kortnamn (används till dropdown-förslag).
   * Returnerar upp till 20 kortnamn som matchar det användaren skriver.
   */
  autocompleteNames(query: string): Observable<any> {
    const url = `https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(
      query
    )}`;
    return this.http.get<any>(url);
  }

  /**
   * 📄 Hämtar ett kort från Scryfall baserat på exakta namnet.
   */
  getCardFromScryfallByName(cardName: string): Observable<any> {
    const url = `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(
      cardName
    )}`;
    return this.http.get<any>(url);
  }

  /**
   * 🆔 Hämtar ett specifikt kort från Scryfall med dess ID.
   */
  getCardFromScryfallById(cardId: string): Observable<any> {
    const url = `https://api.scryfall.com/cards/${cardId}`;
    return this.http.get<any>(url);
  }
}
