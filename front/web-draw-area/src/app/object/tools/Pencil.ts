import { SocketService } from "src/app/services/socket/socket.service";
import { Mouse } from "../Mouse";
import { Tool } from "../Tool";

export class Pencil implements Tool{

    private _color: string;
    private _size: number;

    constructor(private socketService: SocketService, color: string){
        this._color = color;
        this._size = 1;
    }

    
    public set color(color: string) {
        this._color = color;
    }
    public get color(){
        return this._color;
    }

    public set size(size: number){
        this._size = 1;
    }
    public get size(){
        return this._size;
    }
    
    actionLoop(context: CanvasRenderingContext2D, mouse: Mouse): void {
        if (mouse.click && mouse.move && mouse.pos_prev) {
            
            var state = {pos: mouse.pos, pos_prev: mouse.pos_prev, click: mouse.click, move: mouse.click, width: context.canvas.clientWidth, height: context.canvas.clientHeight, size: this._size, color: this._color}
            this.action(context, state);
            
            this.socketService.socket.emit('draw_line', {line: state});
            mouse.move = false;
         }
    }

    action(context: CanvasRenderingContext2D, state: {pos: {x: number, y: number}, pos_prev: {x: number, y: number}, click: boolean, move: boolean, width: number, height: number, size: number, color: string}){
        context.beginPath();
        context.lineWidth = state.size;
        context.moveTo(state.pos.x * state.width, state.pos.y * state.height);
        context.lineTo(state.pos_prev.x * state.width, state.pos_prev.y * state.height);
        context.strokeStyle = state.color;
        context.stroke();
    }
}