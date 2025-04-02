import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { API_URL } from "../../app.config";
import { ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common"; // Import CommonModule
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { DeckService } from "../../services/deck.service";

@Component({
  selector: "app-deck-builder",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./deck-builder.component.html",
  styleUrls: ["./deck-builder.component.scss"],
})
export class DeckBuilderComponent implements OnInit {
  decks: any[] = [];
  newDeckForm: FormGroup;

  constructor(
    private deckService: DeckService,
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
    this.deckService.getAllDecks().subscribe((data) => {
      this.decks = data;
    });
  }

  createDeck(): void {
    const newDeck = this.newDeckForm.value;
    this.deckService.createDeck(newDeck).subscribe((data) => {
      this.decks.push(data);
      this.newDeckForm.reset();
    });
  }

  viewDeck(deckId: string): void {
    this.router.navigate(["/decks", deckId]);
  }
}
