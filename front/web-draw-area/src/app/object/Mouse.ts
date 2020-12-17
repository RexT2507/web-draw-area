export class Mouse {
    private _click: boolean;
    private _move: boolean;
    private _pos: {x: number, y: number};
    private _pos_prev: {x: number, y: number};

    constructor() { 
        this._click = false;
        this._move = false;
        this._pos = {x:0, y:0};
        this._pos_prev = {x:0, y:0};
    }

    //SETTER
    set click(status: boolean){ this._click = status}
    set move(status: boolean){ this._move = status}

    set pos(position: {x: number, y: number}){ this._pos = position}
    set pos_prev(position: {x: number, y: number}){ this._pos_prev = position}

    //GETTER
    get click(){ return this._click }
    get move(){ return this._move }

    get pos(){ return this._pos }
    get pos_prev(){ return this._pos_prev }
}