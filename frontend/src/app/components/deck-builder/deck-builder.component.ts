import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
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
    private fb: FormBuilder
  ) {
    this.newDeckForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      isPublic: [false], // ✅ Ny form control
    });
  }

  ngOnInit(): void {
    this.loadDecks();
  }

  loadDecks(): void {
    // Skapa två parallella anrop
    const userDecks$ = this.deckService.getAllDecks();
    const publicDecks$ = this.deckService.getPublicDecks();

    userDecks$.subscribe({
      next: (userDecks) => {
        publicDecks$.subscribe({
          next: (publicDecks) => {
            // Filtrera bort duplicerade (t.ex. om användarens deck också är publik)
            const uniquePublicDecks = publicDecks.filter(
              (publicDeck: any) =>
                !userDecks.some(
                  (userDeck: any) => userDeck._id === publicDeck._id
                )
            );

            this.decks = [...userDecks, ...uniquePublicDecks];
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error("Failed to fetch public decks:", err);
          },
        });
      },
      error: (err) => {
        // Om användaren inte är inloggad, hämta bara publika decks
        if (err.status === 401) {
          publicDecks$.subscribe({
            next: (publicDecks) => {
              this.decks = publicDecks;
              this.cdr.detectChanges();
            },
            error: (err2) => {
              console.error(
                "Failed to fetch public decks (unauthenticated):",
                err2
              );
            },
          });
        } else {
          console.error("Failed to fetch user decks:", err);
        }
      },
    });
  }

  createDeck(): void {
    if (this.newDeckForm.invalid) {
      return;
    }

    const newDeck = this.newDeckForm.value;

    this.deckService.createDeck(newDeck).subscribe({
      next: (createdDeck) => {
        this.decks.push(createdDeck);
        this.newDeckForm.reset({ isPublic: false }); // 🔁 behåll false som default
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Failed to create deck:", err);
      },
    });
  }

  viewDeck(deckId: string): void {
    this.router.navigate(["/decks", deckId]);
  }
}
