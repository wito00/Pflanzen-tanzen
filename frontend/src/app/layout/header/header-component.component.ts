import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.css',
  imports: [
    MatToolbar,
    NgOptimizedImage
  ]
})
export class HeaderComponent {}
