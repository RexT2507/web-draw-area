import { SocketService } from "src/app/services/socket/socket.service";
import { Mouse } from "../Mouse";
import { Tool } from "../Tool";

export class Eraser implements Tool{
    
    private _color: string;
    private _size: number;

    constructor(private socketService: SocketService, color: string, size: number){
        this._color = color;
        this._size = size;
        
    }

    
    public set color(color : string) {
        this._color = color;
    }
    public get color(){
        return this._color;
    }

    public set size(size: number) {
        this._size = size;
    }
    public get size(){
        return this._size;
    }

    actionLoop(context: CanvasRenderingContext2D, mouse: Mouse): void {
        if (mouse.click) {
            
            var state = {pos: mouse.pos, pos_prev: mouse.pos_prev, click: mouse.click, move: mouse.click, width: context.canvas.clientWidth, height: context.canvas.clientHeight, size: this._size, color: this._color}
            this.action(context, state);
            mouse.move = false;
        }
    }

    action(context: CanvasRenderingContext2D, state: {pos: {x: number, y: number}, pos_prev: {x: number, y: number}, click: boolean, move: boolean, width: number, height: number, size: number, color: string}){
        // context.clearRect(state.pos.x - (this._size/2), state.pos.y - (this._size/2), this._size, this._size);
        context.clearRect((state.pos.x * state.width) - (state.size/2), (state.pos.y * state.height)- (state.size/2), state.size, state.size);
    }
}   