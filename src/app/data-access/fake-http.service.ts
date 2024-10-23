import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ACardItem } from '../model/card-model/a-card.model';
import { BCardItem } from '../model/card-model/b-card.model';
import { CCardItem } from '../model/card-model/c-card.model';

@Injectable({
  providedIn: 'root',
})
export class FakeHttpService {
  private aCardItems: ACardItem[] = [
    { id: 1, title: 'Item A1', description: 'Description A1' },
    { id: 2, title: 'Item A2', description: 'Description A2' },
    { id: 3, title: 'Item A3', description: 'Description A3' },
    { id: 4, title: 'Item A4', description: 'Description A4' },
    { id: 5, title: 'Item A5', description: 'Description A5' },
    { id: 6, title: 'Item A6', description: 'Description A6' },
    { id: 7, title: 'Item A7', description: 'Description A7' },
  ];

  private bCardItems: BCardItem[] = [
    { id: 1, name: 'Value B1', value: 10 },
    { id: 2, name: 'Value B2', value: 20 },
    { id: 3, name: 'Value B3', value: 30 },
    { id: 4, name: 'Value B4', value: 40 },
    { id: 5, name: 'Value B5', value: 50 },
    { id: 6, name: 'Value B6', value: 60 },
    { id: 7, name: 'Value B7', value: 70 },
  ];

  private cCardItems: CCardItem[] = [
    { id: 1, category: 'Category C1', status: 'active' },
    { id: 2, category: 'Category C2', status: 'inactive' },
    { id: 3, category: 'Category C3', status: 'active' },
    { id: 4, category: 'Category C4', status: 'inactive' },
    { id: 5, category: 'Category C5', status: 'active' },
    { id: 6, category: 'Category C6', status: 'inactive' },
    { id: 7, category: 'Category C7', status: 'active' },
  ];

  getRandomCards<T>(cards: T[], count: number): Observable<T[]> {
    const shuffled = [...cards].sort(() => 0.5 - Math.random()); // rastgele bir şekilde sortlayıp count kadar slice alıyoruz.
    return of(shuffled.slice(0, count)).pipe(delay(500)); //Servis isteğini bekliyormuş gibi bir yapı olması adına 0.5 saniyelik bir delay eklendi.
  }
  getRandomCard<T>(cards: T[]): Observable<T> {
    const shuffled = [...cards].sort(() => 0.5 - Math.random()); // rastgele bir şekilde sortlayıp 0. indexi döndürüyoruz.
    return of(shuffled[0]);
  }

  getRandomACardItems(count: number = 5): Observable<ACardItem[]> {
    return this.getRandomCards(this.aCardItems, count);
  }

  getRandomACardItem(): Observable<ACardItem> {
    return this.getRandomCard(this.aCardItems);
  }

  getRandomBCardItems(count: number = 5): Observable<BCardItem[]> {
    return this.getRandomCards(this.bCardItems, count);
  }

  getRandomBCardItem(): Observable<BCardItem> {
    return this.getRandomCard(this.bCardItems);
  }

  getRandomCCardItems(count: number = 5): Observable<CCardItem[]> {
    return this.getRandomCards(this.cCardItems, count);
  }

  getRandomCCardItem(): Observable<CCardItem> {
    return this.getRandomCard(this.cCardItems);
  }
}
