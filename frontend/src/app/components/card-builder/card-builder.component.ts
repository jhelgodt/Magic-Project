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
  newCard = { name: "", type: "", manaCost: "", text: "" };

  constructor(private cardService: CardService) {}

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
}
