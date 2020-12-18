import { Injectable } from '@angular/core';
import { Tool } from 'src/app/object/Tool';
import { Eraser } from 'src/app/object/tools/Eraser';
import { Pencil } from 'src/app/object/tools/Pencil';
import { SocketService } from '../socket/socket.service';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  public tool : Tool

  constructor(private socketService: SocketService) {
    this.tool = new Pencil(this.socketService, "#000000");
  }

  set color(color: string){ 
    this.tool.color = color;
  }

  get color(){return this.tool.color}

  set size(size: number){ 
    this.tool.size = size;
  }

  get size(){return this.tool.size}

  changeTool(toolType){
    var color = this.color;
    var size = this.tool.size;

    switch(toolType){
      case "Pencil":
        this.tool = new Pencil(this.socketService, color);
        break;
      case "Eraser":
        this.tool = new Eraser(this.socketService, color, size);
        break;
      default:
        this.tool = new Pencil(this.socketService, color);
    }
  }
}
