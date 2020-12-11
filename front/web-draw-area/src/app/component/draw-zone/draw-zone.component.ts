import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Mouse } from 'src/app/object/mouse';

@Component({
  selector: 'app-draw-zone',
  templateUrl: './draw-zone.component.html',
  styleUrls: ['./draw-zone.component.scss']
})
export class DrawZoneComponent implements OnInit {
  
  public width: number;
  public height: number;

  mouse: Mouse;
  @ViewChild('drawing')
  drawing: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit(): void {
    this.resizeWindow();
    this.mouse = new Mouse();
    this.bigLoop();
  }

  ngAfterViewInit(): void {
    this.context = this.drawing.nativeElement.getContext('2d');
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeWindow();
  }

  resizeWindow(){
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  bigLoop(){
    
    if (this.mouse.click && this.mouse.move && this.mouse.pos_prev) {
      var line = [ this.mouse.pos, this.mouse.pos_prev ]
      this.context.beginPath();
      this.context.lineWidth = 2;
      this.context.moveTo(line[0].x * this.width, line[0].y * this.height);
      this.context.lineTo(line[1].x * this.width, line[1].y * this.height);
      this.context.stroke();
      this.mouse.move = false;
   }
   this.mouse.pos_prev = {x: this.mouse.pos.x, y: this.mouse.pos.y};
    setTimeout(() => {this.bigLoop()}, 25);
  }

}
