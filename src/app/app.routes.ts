import { Routes } from '@angular/router';
import { QueryPanelComponent } from './components/query-panel/query-panel.component';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';
import { CardApplicationComponent } from './ui/card-application/card-application.component';
import { AdvancedCardApplicationComponent } from './ui/advanced-card-application/advanced-card-application.component';
import { MapApplicationComponent } from './components/map-application/map-application.component';
export const routes: Routes = [
  { path: 'soru-1', component: QueryPanelComponent },
  { path: 'soru-2', component: TaskManagerComponent },
  { path: 'soru-3', component: CardApplicationComponent },
  { path: 'soru-4', component: AdvancedCardApplicationComponent },
  { path: 'soru-5', component: MapApplicationComponent },
];
