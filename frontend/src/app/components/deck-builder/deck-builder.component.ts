import { Component, Inject, OnInit } from "@angular/core";
import { BookService } from "../../services/book.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-deck-builder",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./deck-builder.component.html",
  styleUrls: ["./deck-builder.component.scss"], // Fixed typo: styleUrl -> styleUrls
})
export class DeckBuilderComponent implements OnInit {
  books: any[] = []; // Array to store books fetched from the backend

  constructor(private bookService: BookService) {} // Inject the service

  ngOnInit(): void {
    // Fetch books when the component initializes
    this.bookService.getBooks().subscribe((data: any) => {
      this.books = data;
    });
  }
}
