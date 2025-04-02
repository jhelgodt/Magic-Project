import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root", // Makes the service available application-wide
})
export class BookService {
  constructor(
    private http: HttpClient,
    @Inject("API_URL") private APIURL: string // Inject the API_URL from app.config.ts
  ) {}

  // Fetch all books
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIURL}/books`);
  }

  // Fetch a book by ID
  getBookById(id: string): Observable<any> {
    return this.http.get<any>(`${this.APIURL}/books/${id}`);
  }

  // Create a new book
  createBook(book: any): Observable<any> {
    return this.http.post<any>(`${this.APIURL}/books`, book);
  }

  // Update an existing book
  updateBook(id: string, book: any): Observable<any> {
    return this.http.put<any>(`${this.APIURL}/books/${id}`, book);
  }

  // Delete a book
  deleteBook(id: string): Observable<any> {
    return this.http.delete<any>(`${this.APIURL}/books/${id}`);
  }
}
