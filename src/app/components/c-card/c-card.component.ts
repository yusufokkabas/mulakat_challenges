import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CCardItem } from '../../model/card-model/c-card.model';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MatList, MatListItem } from '@angular/material/list';
@Component({
  selector: 'app-c-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, MatList, MatListItem],
  template: `
    <div class="card-container">
      <p-card
        [style]="{ height: '100%', display: 'flex', flexDirection: 'column' }"
      >
        <ng-template pTemplate="header">
          <div class="centered-header">C Card Items</div>
        </ng-template>
        <div class="card-content">
          <mat-list>
            <mat-list-item *ngFor="let item of cardItems">
              <span class="centered-item">{{ item.category }}</span>
            </mat-list-item>
          </mat-list>
        </div>
        <ng-template pTemplate="footer">
          <div class="card-footer">
            <p-button label="Add Item" (onClick)="addCard()"></p-button>
            <p-button
              label="Remove Item"
              (onClick)="removeCard()"
              [style]="{ 'margin-left': '.5em' }"
            ></p-button>
          </div>
        </ng-template>
      </p-card>
    </div>
  `,
  styles: [
    `
      .centered-header {
        text-align: center;
        width: 100%;
      }
      .centered-item {
        display: flex;
        justify-content: center;
        width: 100%;
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
      p-card {
        margin: 16px;
        display: flex;
        flex-direction: column;
      }
      .card-content {
        flex-grow: 1;
        overflow-y: auto;
      }
      .card-footer {
        display: flex;
        justify-content: flex-end;
        margin-top: auto;
      }
    `,
  ],
})
export class CCardComponent implements OnInit {
  cardItems: CCardItem[] = [];

  constructor(private fakeHttpService: FakeHttpService) {}

  ngOnInit() {
    this.loadCards();
  }

  loadCards() {
    this.fakeHttpService.getRandomCCardItems().subscribe((cards) => {
      this.cardItems = cards;
    });
  }

  addCard() {
    this.fakeHttpService.getRandomCCardItem().subscribe((card) => {
      this.cardItems.push(card);
    });
  }

  removeCard() {
    if (this.cardItems.length > 0) {
      this.cardItems.pop();
    }
  }
}
