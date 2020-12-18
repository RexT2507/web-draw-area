import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/app/services/tool/tool.service';

@Component({
  selector: 'app-tool-dashboard',
  templateUrl: './tool-dashboard.component.html',
  styleUrls: ['./tool-dashboard.component.scss']
})
export class ToolDashboardComponent implements OnInit {

  activeTool: string;
  constructor(public toolService: ToolService) {
    this.activeTool = "Pencil";
  }

  ngOnInit(): void {
  }

  changeTool(typeTool: string){
    this.activeTool = typeTool;
    this.toolService.changeTool(typeTool);
    
  }

}
