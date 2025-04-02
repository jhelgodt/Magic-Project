import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { API_URL } from "../../app.config";
import { ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common"; // Import CommonModule
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-deck-builder",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./deck-builder.component.html",
  styleUrls: ["./deck-builder.component.scss"],
})
export class DeckBuilderComponent implements OnInit {
  decks: any[] = []; // Array to store decks fetched from the backend
  newDeckForm: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder // Inject FormBuilder here
  ) {
    this.newDeckForm = this.fb.group({
      name: [""],
      description: [""],
    });
  }

  ngOnInit(): void {
    this.http.get<any[]>(`${API_URL}/decks`).subscribe((data) => {
      console.log("Decks fetched from backend:", data); // Log the fetched decks
      this.decks = data;
      setTimeout(() => {
        this.cdr.detectChanges(); // Trigger change detection after a delay
      }, 0);
    });
  }
  createDeck(): void {
    const newDeck = this.newDeckForm.value;
    this.http.post(`${API_URL}/decks`, newDeck).subscribe({
      next: (data) => {
        console.log("Deck created:", data);
        this.decks.push(data); // Add the new deck to the list
        this.newDeckForm.reset(); // Reset the form
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error creating deck:", err);
      },
    });
  }
  // Navigate to the deck detail page
  viewDeck(deckId: string): void {
    console.log("Navigating to deck:", deckId); // Add a log to confirm navigation
    this.router.navigate(["/decks", deckId]);
  }
  navigateToCardBuilder(): void {
    this.router.navigate(["/card-builder"]);
  }
}
