import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawZoneComponent } from './component/draw-zone/draw-zone.component';
import { SocketService } from './services/socket/socket.service';
import { ToolDashboardComponent } from './component/tool-dashboard/tool-dashboard/tool-dashboard.component';
import { ToolService } from './services/tool/tool.service';


@NgModule({
  declarations: [
    AppComponent,
    DrawZoneComponent,
    ToolDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [SocketService, ToolService],
  bootstrap: [AppComponent]
})
export class AppModule { }
