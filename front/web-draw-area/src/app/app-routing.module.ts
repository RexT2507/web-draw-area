import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Component
import { DrawZoneComponent } from './component/draw-zone/draw-zone.component';
import { ToolDashboardComponent } from './component/tool-dashboard/tool-dashboard/tool-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dessin', pathMatch: 'full' },
  { path: 'drawzone', component: DrawZoneComponent },
  { path: 'dessin', component: ToolDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
