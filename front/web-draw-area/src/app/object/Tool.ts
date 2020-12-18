import { Mouse } from "./Mouse";

export interface Tool{
    color: string;
    size: number;
    
    actionLoop(contexte: CanvasRenderingContext2D, mouse: Mouse): void;
    action(contexte: CanvasRenderingContext2D, state: {pos: {x: number, y: number}, pos_prev: {x: number, y: number}, click: boolean, move: boolean, width: number, height: number, size: number, color: string}): void
}