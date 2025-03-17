import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-data-card-module',
  templateUrl: './data-card-module.component.html',
  styleUrl: './data-card-module.component.css',
  standalone: true,
  imports: [CommonModule, MatCardModule]
})
export class DataCardComponent {
  @Input() data: any;
}
