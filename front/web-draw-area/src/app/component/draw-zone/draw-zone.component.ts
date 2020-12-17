import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SocketService } from 'src/app/services/socket/socket.service';
import { Mouse } from '../../object/Mouse';

@Component({
  selector: 'app-draw-zone',
  templateUrl: './draw-zone.component.html',
  styleUrls: ['./draw-zone.component.scss']
})
export class DrawZoneComponent implements OnInit {
  
  public width: number;
  public height: number;

  public theDraw: Array<{pos: {x: number, y: number}, pos_prev: {x: number, y: number}, width: number, height: number}>

  public form: {width: number, height: number};

  mouse: Mouse;

  @ViewChild('drawing')
  drawing: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D;

  constructor(private socketService: SocketService) { }

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

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.resizeWindow();
  //   this.reDraw();
  // }

  // resizeWindow(){
  //   this.width = window.innerWidth;
  //   this.height = window.innerHeight;
  // }

  reDraw(): void{
    
    for(var i=0; i < this.theDraw.length; i++){
      this.drawTheFrame(this.theDraw[i]);
    }
  }

  resizeDrawZone(w: number, h: number): void{
    this.width = w;
    this.height = h;
    this.context.canvas.width = w
    this.context.canvas.height = h
  }

  submit(){
    this.resizeDrawZone(this.form.width, this.form.height);
    this.reDraw();
  }

  drawTheFrame(line: {pos: {x: number, y: number}, pos_prev: {x: number, y: number}, width: number, height: number}): void{
    this.context.beginPath();
    this.context.lineWidth = 2;
    this.context.moveTo(line.pos.x * line.width, line.pos.y * line.height);
    this.context.lineTo(line.pos_prev.x * line.width, line.pos_prev.y * line.height);
    this.context.stroke();
  }

  bigLoop(): void{
    if (this.mouse.click && this.mouse.move && this.mouse.pos_prev) {
      var line = {pos: this.mouse.pos, pos_prev: this.mouse.pos_prev, width: +this.width, height: +this.height};
      this.theDraw.push(line);
      
      this.drawTheFrame(line);
      this.mouse.move = false;
   }
   this.mouse.pos_prev = {x: this.mouse.pos.x, y: this.mouse.pos.y};
    setTimeout(() => {this.bigLoop()}, 25);
  }

}
