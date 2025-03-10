import { Routes } from '@angular/router';
import { ListComponent } from './modules/list/list.component';
import { GridComponent } from './modules/grid/grid.component';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "list",
      },
      {
        path: "list",
        component: ListComponent,
      },
      {
        path: "grid",
        component: GridComponent,
      },
];
