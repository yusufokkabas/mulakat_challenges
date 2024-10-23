import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedCardComponent } from '../../components/advanced-card/advanced-card.component';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { ACardItem } from '../../model/card-model/a-card.model';
import { BCardItem } from '../../model/card-model/b-card.model';
import { CCardItem } from '../../model/card-model/c-card.model';
import { ButtonModule } from 'primeng/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-advanced-card-application',
  standalone: true,
  imports: [
    CommonModule,
    AdvancedCardComponent,
    ButtonModule,
    MatListModule,
    MatIconModule,
  ],
  template: `
    <div class="container">
      <app-advanced-card header="A Card Items">
        <mat-list>
          <mat-list-item *ngFor="let item of aCardItems; let i = index">
            <span class="item-title">{{ item.title }}</span>
            <button
              mat-icon-button
              color="warn"
              (click)="removeCardItem('a', i)"
            >
              <mat-icon>delete</mat-icon>
            </button>
          </mat-list-item>
        </mat-list>
        <ng-template #footerTemplate>
          <div class="footer-container">
            <p-button label="Add Item" (onClick)="addCardItem('a')"></p-button>
          </div>
        </ng-template>
      </app-advanced-card>

      <app-advanced-card header="B Card Items">
        <mat-list class="inline-list">
          <mat-list-item
            *ngFor="let item of bCardItems; let i = index"
            class="item"
          >
            <span class="item-title">{{ item.name }}</span>
            <button
              mat-icon-button
              color="warn"
              (click)="removeCardItem('b', i)"
            >
              <mat-icon>delete</mat-icon>
            </button>
          </mat-list-item>
        </mat-list>
        <ng-template #footerTemplate>
          <div class="footer-container">
            <p-button label="Add Item" (onClick)="addCardItem('b')"></p-button>
          </div>
        </ng-template>
      </app-advanced-card>

      <app-advanced-card header="C Card Items">
        <mat-list class="inline-list">
          <mat-list-item
            *ngFor="let item of cCardItems; let i = index"
            class="item"
          >
            <span class="item-title">{{ item.category }}</span>
            <button
              mat-icon-button
              color="warn"
              (click)="removeCardItem('c', i)"
            >
              <mat-icon>delete</mat-icon>
            </button>
          </mat-list-item>
        </mat-list>
        <ng-template #footerTemplate>
          <div class="footer-container">
            <p-button label="Add Item" (onClick)="addCardItem('c')"></p-button>
          </div>
        </ng-template>
      </app-advanced-card>
    </div>
  `,
  styles: [
    `
      .item-title {
        margin-right: 10px;
        bottom: 7px;
        position: sticky;
      }
      .footer-container {
        display: flex;
        justify-content: center;
        width: 100%;
      }
      .container {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
      }
    `,
  ],
})
export class AdvancedCardApplicationComponent implements OnInit {
  aCardItems: ACardItem[] = [];
  bCardItems: BCardItem[] = [];
  cCardItems: CCardItem[] = [];

  constructor(private fakeHttpService: FakeHttpService) {}

  ngOnInit() {
    this.loadCards();
  }

  loadCards() {
    this.fakeHttpService.getRandomACardItems(5).subscribe((cards) => {
      this.aCardItems = cards;
    });
    this.fakeHttpService.getRandomBCardItems(5).subscribe((cards) => {
      this.bCardItems = cards;
    });
    this.fakeHttpService.getRandomCCardItems(5).subscribe((cards) => {
      this.cCardItems = cards;
    });
  }

  addCardItem(cardType: 'a' | 'b' | 'c') {
    switch (cardType) {
      case 'a':
        this.fakeHttpService.getRandomACardItem().subscribe((card) => {
          this.aCardItems.push(card);
        });
        break;
      case 'b':
        this.fakeHttpService.getRandomBCardItem().subscribe((card) => {
          this.bCardItems.push(card);
        });
        break;
      case 'c':
        this.fakeHttpService.getRandomCCardItem().subscribe((card) => {
          this.cCardItems.push(card);
        });
        break;
    }
  }

  removeCardItem(cardType: 'a' | 'b' | 'c', index: number) {
    switch (cardType) {
      case 'a':
        this.aCardItems.splice(index, 1);
        break;
      case 'b':
        this.bCardItems.splice(index, 1);
        break;
      case 'c':
        this.cCardItems.splice(index, 1);
        break;
    }
  }
}
