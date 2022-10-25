

class ChatWidget extends HTMLElement {
    constructor() {
        //Siempre invocamos al constructor del padre
        super();

        //Creo 2 variables dentro del constructor que de inicio
        //no tienen valor (undefined) y a las que les daré valor
        //con los atributos del elemento HTML.
        this.name = '';
        this.lastname = '';
        this.button = '';
        this.openButton = false;
    }

    //Para indicar y observar los atributos que tiene la etiqueta
    //html
    static get observedAttributes() {
        return ['name', 'lastname', 'button']
    }

    
    //La utilizamos para cambiar el valor de los atributos del 
    //elemento HTML
    attributeChangedCallback(nameAtr, oldValue, newValue) {
        switch(nameAtr){
            case "name":
                this.name = newValue;
            break;

            case "lastname":
                this.lastname = newValue;

            break;

            case "button":
                this.button = newValue
            break

            default :
        }
    }

    //Método que ejecuta la lógica del web component cuando 
    //es insertado en el DOM
    connectedCallback() {
        //guardamos el shodow DOM en modo open, en una variable
        let shadow = this.attachShadow( { mode: 'open' } );

        //Todo el CSS se puede poner en un archivo css aparte y se incluye en el index.html
        //del proyecto con un link normal
        shadow.innerHTML = `
            <style>
                :host {
                    --orange: #e67e22;
                    --space: 3em;
                }

                h1 {
                    color: #0000ff;
                }

                .button {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: var(--space);
                    height: var(--space);
                    margin: 10px;
                    background-color: var(--orange);
                    border-radius: 50%;
                    border: 1px solid #e40e22;
                    z-index: 99;
                }

                .button:active {
                    transform: scale(0.98);
                    box-shadow: 1px 1px 2px #4f4f4f
                    
                }

                .button-inner-text {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.7rem;
                    font-weight: 700;
                    cursor: pointer
                }

                .help-non-visible {
                    display: none;
                }

                .help-visible {
                    position: absolute;
                    bottom: 0;
                    right: 60px;
                    width: 20%;
                    height: 75%;
                    margin: 0px 0px 10px 10px;
                    display:flex;
                    flex-direction: column;
                    align-items: center;
                    border-radius: 10px;
                    border: 2px solid #e40e22;
                    background-color: var(--orange);
                    z-index: 99;
                }

                .help-visible h1 {
                    font-size: 1.2rem;
                }
                .help-visible p {
                    font-size: 0.8rem;
                }

            </style>

            <button class='button'> 
                <div class='button-inner-text'>
                    ${this.button} 
                </div>
            </button>
            <div class='help-non-visible'>
                <h1>Hola ${this.name} ${this.lastname}</h1>
                <p>¿Cómo podemos ayudarte?</p>
            </div>
        `
        
        let button = shadow.querySelector('.button');
        let helpBox = shadow.querySelector('.help-non-visible')
            button.addEventListener('click', () => {
                this.openButton = !this.openButton;
                console.log(this.openButton)

                if(this.openButton){
                    helpBox.classList.add('help-visible')
                }else{
                    helpBox.classList.remove('help-visible')
                }
            })
    }
    
}


window.customElements.define('chat-widget', ChatWidget);