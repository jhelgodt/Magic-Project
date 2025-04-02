import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../app.config";
import { CommonModule } from "@angular/common"; // Import CommonModule
import { FormsModule } from "@angular/forms"; // Import FormsModule

@Component({
  selector: "app-card-builder",
  imports: [CommonModule, FormsModule], // Add FormsModule to the imports array
  templateUrl: "./card-builder.component.html",
  styleUrls: ["./card-builder.component.scss"], // Corrected to styleUrls
})
export class CardBuilderComponent {
  newCard = { name: "", type: "", manaCost: "", text: "" };

  constructor(private http: HttpClient) {}

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

    console.log("Payload being sent:", this.newCard);

    this.http.post(`${API_URL}/cards`, this.newCard).subscribe({
      next: (data) => {
        console.log("Card created:", data);
        this.newCard = { name: "", type: "", manaCost: "", text: "" }; // Reset the form
      },
      error: (err) => {
        console.error("Error creating card:", err);
        if (err.error && err.error.error) {
          alert(`Error: ${err.error.error}`); // Display server error message
        } else {
          alert("An unknown error occurred.");
        }
      },
    });
  }
}
