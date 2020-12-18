import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Tool } from 'src/app/object/Tool';
import { Pencil } from 'src/app/object/tools/Pencil';
import { SocketService } from 'src/app/services/socket/socket.service';
import { ToolService } from 'src/app/services/tool/tool.service';
import { Mouse } from '../../object/Mouse';

@Component({
  selector: 'app-draw-zone',
  templateUrl: './draw-zone.component.html',
  styleUrls: ['./draw-zone.component.scss']
})
export class DrawZoneComponent implements OnInit {
  
  public width: number;
  public height: number;

  public theDraw: Array<{pos: {x: number, y: number}, pos_prev: {x: number, y: number}, click: boolean, move: boolean, width: number, height: number, size: number, color: string}>
  
  //formulaire resize
  public form: {width: number, height: number};

  mouse: Mouse;

  @ViewChild('drawing')
  drawing: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D;

  constructor(private socketService: SocketService, private toolService: ToolService) { }

  ngOnInit(): void {
    this.socketService.setupSocketConnection();

    this.width = 500;
    this.height = 200;
    this.form = {width: this.width, height: this.height};
    this.mouse = new Mouse();
    this.theDraw = [];
    this.bigLoop();
  }

  ngAfterViewInit(): void {
    this.context = this.drawing.nativeElement.getContext('2d');
    this.resizeDrawZone(this.width, this.height);

    //chargé l'état actuel du dessin
    this.socketService.socket.on('draw_line', (data) => {
      this.theDraw.push(data.line);
      if(Object.keys(data).length > 0){
        this.toolService.tool.action(this.context, data.line);
      }
    })
  }

  @HostListener('mousedown', ['$event'])
  onClickDown(): void {
    this.mouse.click = true;
  }

  @HostListener('mouseup')
  onClickUp(): void {
    this.mouse.click = false;
    
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void{
    this.mouse.pos = {x: event.clientX / this.width, y: event.clientY / this.height};
    this.mouse.move = true;
  }

  reDraw(): void{
    
    for(var i=0; i < this.theDraw.length; i++){
      this.toolService.tool.action(this.context, this.theDraw[i]);
    }
  }

  resizeDrawZone(w: number, h: number): void{
    this.width = w;
    this.height = h;
    this.context.canvas.width = w;
    this.context.canvas.height = h;
  }

  submit(){
    this.resizeDrawZone(this.form.width, this.form.height);
    this.reDraw();
  }

  bigLoop(): void{

    this.toolService.tool.actionLoop(this.context, this.mouse);

    this.mouse.pos_prev = {x: this.mouse.pos.x, y: this.mouse.pos.y};
    setTimeout(() => {this.bigLoop()}, 25);
  }

}
