import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Component
import { DrawZoneComponent } from './component/draw-zone/draw-zone.component';

const routes: Routes = [
  { path: '', redirectTo: '/drawzone', pathMatch: 'full' },
  { path: 'drawzone', component: DrawZoneComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
