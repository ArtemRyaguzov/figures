class Controller {
    constructor(model){
        this.model = model;
    }

    addInput(event, inputQuantity, inputCreator){
        event.preventDefault();

        for(let i = 0; i < inputQuantity; i++){
            inputCreator.insertAdjacentHTML('beforebegin', '<input class="form__input" type="text">');
        }
    }

    stringParser(string){

        const parsedString = {
            figureName: string.split(' ')[0],
            coords: '',
            options: {}
        }

        const args = string.slice(string.indexOf('-') + 1).split('-');

        args.forEach(arg => {
            if(arg[0] === 'p'){
                parsedString.coords = arg.trim().slice(2).replace(/([^\s0-9])+/g, '');
            } else {
                parsedString.options[arg[0]] = arg.trim().slice(2);
            }
        });

        return parsedString;

    }

    submitHandler(event, ctx){
        event.preventDefault();

        const userInputs = [
            ...document.querySelectorAll('.form__input')
        ]

        const userInputValues = userInputs.map(i => i.value);


        userInputValues.forEach(userInputValue => {
            const parsedString = this.stringParser(userInputValue);
            const originalState = { ...this.model }

            this.model.figureName = parsedString.figureName;
            this.model.coords = parsedString.coords.split(' ').map(i => +i);
            this.model.options = parsedString.options;

            switch(this.model.figureName){
                case 'rectangle': 
                    this.createRectangle(ctx);
                break;
                case 'line': 
                    this.createLine(ctx);
                break;
                case 'triangle': 
                    this.createTriangle(ctx);
                break;
                case 'circle': 
                    this.createCircle(ctx);
                break;
                case 'ellipse': 
                    this.createEllipse(ctx);
                break;
                default: alert(`Unsupported figure ${this.model.figureName}`);
            }

        });

    }

    createLine(ctx){

        const [ startX, startY, cp1x, cp1y, cp2x, cp2y, cp3x, cp3y ] = this.model.coords;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(startX, startY); 

        if(!this.model.options.t){
            ctx.lineTo(cp1x, cp1y);
        }

        if(this.model.options.t === 'bezierCurve'){
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, cp3x, cp3y);
        }

        if(this.model.options.t === 'quadraticCurve'){
            ctx.quadraticCurveTo(cp1x, cp1y, cp2x, cp2y);
        }

        if(this.model.options.c){
            ctx.strokeStyle = this.model.options.c;
        }

        if(this.model.options.w){
            ctx.lineWidth = this.model.options.w;
        }

        ctx.stroke();
        ctx.restore();

    }

    createRectangle(ctx){

        const [x, y, width, height] = this.model.coords;

        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, width, height);

        if(this.model.options.b){
            ctx.fillStyle = this.model.options.b;
            ctx.fill();
        }

        if(this.model.options.c){
            ctx.strokeStyle = this.model.options.c;
        }

        if(this.model.options.w){
            ctx.lineWidth = this.model.options.w;
        }

        ctx.stroke();
        ctx.restore();

    }

    createTriangle(ctx){

        const [startX, startY, cp1x, cp1y, cp2x, cp2y] = this.model.coords;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(startX, startY); 
        ctx.lineTo(cp1x, cp1y);
        ctx.lineTo(cp2x, cp2y);
        ctx.closePath();

        if(this.model.options.c){
            ctx.strokeStyle = this.model.options.c;
        }

        if(this.model.options.w){
            ctx.lineWidth = this.model.options.w;
        }

        if(this.model.options.b){
            ctx.fillStyle = this.model.options.b;
            ctx.fill();
        }

        ctx.stroke();
        ctx.restore();

    }

    createCircle(ctx){

        const [ x, y ] = this.model.coords;
        const radius = +this.model.options.r || 50;

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);

        if(this.model.options.c){
            ctx.strokeStyle = this.model.options.c;
        }

        if(this.model.options.b){
            ctx.fillStyle = this.model.options.b;
            ctx.fill();
        }

        ctx.stroke();
        ctx.restore();

    }

    createEllipse(ctx){

        const [ x, y ] = this.model.coords;
        const firstRadius = +this.model.options.r || 50;
        const secondRadius = +this.model.options.R || 0.75;

        ctx.save();
        ctx.scale(secondRadius, 1);
        ctx.beginPath();
        ctx.arc(x, y, firstRadius, 0, Math.PI * 2);

        if(this.model.options.c){
            ctx.strokeStyle = this.model.options.c;
        }

        if(this.model.options.b){
            ctx.fillStyle = this.model.options.b;
            ctx.fill();
        }

        ctx.stroke();
        ctx.restore();

    }

}