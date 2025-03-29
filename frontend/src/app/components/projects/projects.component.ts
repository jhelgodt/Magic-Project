import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Magic Deck Tracker',
      description: 'A card tracking app using Scryfall API.',
      role: 'Solo Project',
      image: 'assets/mtg-project.jpg',
      githubLink: 'https://github.com/jhelgodt/magic-deck-tracker',
      liveLink: '#',
    },
    {
      title: 'Portfolio Website',
      description: 'A responsive personal portfolio built with Angular.',
      role: 'Solo Project',
      image: 'assets/header.svg',
      githubLink: 'https://github.com/jhelgodt/portfolio2',
      liveLink: 'https://joakimhelgodt.com/',
    },
  ];
}
