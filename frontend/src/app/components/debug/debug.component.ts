import { Component, Inject, OnInit } from "@angular/core";
import { ROUTES } from "@angular/router";
import { API_URL } from "../../app.config";

@Component({
  selector: "app-debug",
  templateUrl: "./debug.component.html",
  styleUrls: ["./debug.component.scss"],
})
export class DebugComponent implements OnInit {
  constructor(
    @Inject(ROUTES) private routes: any, // Inject ROUTES
    @Inject(API_URL) private apiUrl: string // Inject API_URL
  ) {}

  ngOnInit(): void {
    console.log("✅ ROUTES:", this.routes); // Access ROUTES through the injected property
    console.log("✅ API_URL:", this.apiUrl); // Access API_URL through the injected property
  }
}
