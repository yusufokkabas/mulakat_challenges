import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-advanced-card',
  standalone: true,
  imports: [CommonModule, CardModule],
  template: `
    <div class="card-container">
      <p-card>
        <ng-template pTemplate="header">
          <div class="centered-header">{{ header }}</div>
        </ng-template>
        <ng-content></ng-content>
        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
      </p-card>
    </div>
  `,
  styles: [
    `
      .centered-header {
        text-align: center;
        width: 100%;
      }
      p-card {
        margin: 16px;
        display: flex;
        flex-direction: column;
      }
      .card-container {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 16px;
        background-color: #f0f0f0;
        margin-top: 16px;
      }
    `,
  ],
})
export class AdvancedCardComponent {
  @Input() header: string = '';
  @ContentChild('footerTemplate') footerTemplate!: TemplateRef<any>;
}
