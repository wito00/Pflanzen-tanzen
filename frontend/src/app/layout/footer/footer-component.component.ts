import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  templateUrl: './footer-component.component.html',
  styleUrl: './footer-component.component.css',
  imports: [
    MatToolbar
  ]
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}
