import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACardComponent } from '../../components/a-card/a-card.component';
import { BCardComponent } from '../../components/b-card/b-card.component';
import { CCardComponent } from '../../components/c-card/c-card.component';

@Component({
  selector: 'app-card-application',
  standalone: true,
  imports: [CommonModule, ACardComponent, BCardComponent, CCardComponent],
  template: `
    <div class="container">
      <app-a-card></app-a-card>
      <app-b-card></app-b-card>
      <app-c-card></app-c-card>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
      }
    `,
  ],
})
export class CardApplicationComponent {}
