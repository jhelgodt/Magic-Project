import { Component } from "@angular/core";
import { CardService } from "../../services/card.service";
import { CommonModule } from "@angular/common"; // Import CommonModule
import { FormsModule } from "@angular/forms"; // Import FormsModule

@Component({
  selector: "app-card-builder",
  imports: [CommonModule, FormsModule],

  templateUrl: "./card-builder.component.html",
  styleUrls: ["./card-builder.component.scss"],
})
export class CardBuilderComponent {
  cardName: string = ""; // Input for card name
  fetchedCard: any = null; // Store fetched card data
  savedCard: any = null; // Store saved card data
  newCard = { name: "", type: "", manaCost: "", text: "" }; // Form for creating a new card

  constructor(private cardService: CardService) {}

  // Fetch card by name
  fetchCard(): void {
    if (!this.cardName) {
      console.error("Card name is required.");
      return;
    }

    this.cardService.getCardByName(this.cardName).subscribe({
      next: (data) => {
        console.log("Fetched card:", data);
        this.fetchedCard = data; // Store the fetched card data
      },
      error: (err) => {
        console.error("Failed to fetch card:", err);
        this.fetchedCard = null; // Reset on error
      },
    });
  }

  // Create a new card
  createCard(): void {
    if (
      !this.newCard.name ||
      !this.newCard.type ||
      !this.newCard.manaCost ||
      !this.newCard.text
    ) {
      console.error("All fields are required to create a card.");
      return;
    }

    this.cardService.createCard(this.newCard).subscribe({
      next: (data) => {
        console.log("Card created:", data);
        this.newCard = { name: "", type: "", manaCost: "", text: "" }; // Reset form
      },
      error: (err) => {
        console.error("Failed to create card:", err);
      },
    });
  }

  saveFetchedCard(): void {
    if (!this.fetchedCard) {
      console.error("No card fetched to save.");
      return;
    }

    this.cardService.addCardFromScryfall(this.fetchedCard.name).subscribe({
      next: (data: any) => {
        console.log("Card saved:", data);
        this.savedCard = data; // Store the saved card data
      },
      error: (err: any) => {
        console.error("Failed to save card:", err);
      },
    });
  }
}
