class View {
    constructor(controller){
        this.controller = controller;
        this.ctx = document.getElementById('canvas').getContext('2d');
        this.inputQuantity = document.querySelectorAll('.form__input').length;
        this.inputCreator = document.querySelector('.form__addInput');
        this.addInputListener = this.inputCreator.addEventListener('click', event => this.controller.addInput(event, this.inputQuantity, this.inputCreator));
        this.form = document.querySelector('.form');
        this.submitListener = this.form.addEventListener('submit', event => this.controller.submitHandler(event, this.ctx));
    }
}