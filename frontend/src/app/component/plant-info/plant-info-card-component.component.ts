import { Component } from '@angular/core';

import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-plant-info-card-component',
  templateUrl: './plant-info-card-component.component.html',
  imports: [
    MatCard,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatButton,
    MatInput,
    FormsModule,
  ],
  styleUrls: ['./plant-info-card-component.component.css']
})
export class PlantInfoCardComponent {
  isEditable = false;
  plantData = {
    name: 'Ficus',
    species: 'Ficus elastica',
    wateringSchedule: 'Once a week'
  };

  handleEditToggle() {
    this.isEditable = !this.isEditable;
  }

  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const { name, value } = input;
    this.plantData = {
      ...this.plantData,
      [name]: value
    };
  }
}
