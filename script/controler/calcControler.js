class CalcController{

    
    constructor () {
        this._audio = new Audio('click.mp3')

        this._audioOnOF = false

        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = []

        this._displayCalcEl = document.querySelector("#display");
        this._DataCalcEl = document.querySelector("#data");
        this._HoraCalcEl = document.querySelector("#hora");


        
        this._displayCalc;
        this._currentDate;
        this.initialize ();
        this.initButtonsEvent()
        this.initKeyBoard()
        
        
    }

    copyToClipboard(){
        let input = document.createElement('input');

        input.value = this.displayCalc;

        document.body.appendChild(input);

        input.select();
        
        document.execCommand("Copy")

        input.remove()

    }

    pasteFromClipboard(){

        document.addEventListener('paste' , e=>{
           let text = e.clipboardData.getData('Text')

           this.displayCalc = parseFloat(text)

        })

    }


    initialize (){
        /*var agora = new Date();
        var dat = agora.getDate() + "/" + agora.getMonth() + "/" + agora.getFullYear();
        var hr = agora.getHours() + ":" + agora.getMinutes() + ":" + agora.getSeconds();
        */
        
         this.displayDate = this.dataAtual.toLocaleDateString("pt-br",{
        day: "2-digit",
        month: "long",
        year: "numeric"
        })
        this.displayTime = this.dataAtual.toLocaleTimeString("pt-br")

        let intervalo = setInterval(()=>{

            this.displayDate = this.dataAtual.toLocaleDateString("pt-br",{
                day: "2-digit",
                month: "long",
                year: "numeric"
            })
            this.displayTime = this.dataAtual.toLocaleTimeString("pt-br")

        },1000)

       

        setTimeout(() => {
            clearInterval (intervalo)
        },10000);
       this.setLastNumberToDisplay()
       this.pasteFromClipboard()

       document.querySelectorAll('.btn-ac').forEach(btn=>{
           btn.addEventListener('dblclick', e=>{

            this.toggleAudio();

           })
       })
    }
        toggleAudio(){
            if (this._audioOnOF == true){
                this._audioOnOF = false
            }else{
                this._audioOnOF = true
            }

        }

        playAudio(){
            if (this._audioOnOF){
                this._audio.currentTime = 0;
                this._audio.play();
            }
        }

        initKeyBoard(){
            document.addEventListener('keyup', e=>{
                
                this.playAudio();
                switch (e.key) {
                    case 'escape':
                        this.clearAll()
                    break
                    case 'Backspace':
                        this.clearEntry()
                    break
                    case '+':
                 
                    case '-':

                    case '/':
                    
                    case '%':
                    
                    case '*':
                        this.addOperation(e.key);
                        break
                   
                    case 'Enter':
                    case '=':
                        this.calc('=')
                        
                    break
                    case '.':
                        case ',':
                        this.addDot()
                    break
    
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
    
                    this.addOperation(parseInt(e.key))
    
                        break;

                    case 'c':
                        if(e.ctrlKey) this.copyToClipboard();
                        break
    
                   
    
                }
            });
        }

        addEventListenerAll(element,events, fn){
            events.split(' ').forEach(event =>{
                element.addEventListener(event ,fn, false)
            })
        }

        clearAll(){
            this._operation = []
            this._lastNumber = '';
            this._lastOperator = '';
            this.setLastNumberToDisplay(0);
        }
        clearEntry(){
            this._operation.pop()
            this._lastNumber = '';
            this._lastOperator = '';
            this.setLastNumberToDisplay();
        }

        getLastOperation(){
           return this._operation[this._operation.length - 1]

        }

        setLastOperation(value){
            this._operation[this._operation.length - 1] = value
        }

        isOperation(value){
           return (['+','-','*','%','/'].indexOf(value) > -1)
           
        }

        pushOperator(value){

            this._operation.push(value);
          
            if (this._operation.length > 3 ){

                console.log(this._operation);

                

                this.calc();

            }

        }

        getResult(){
            try {
                return eval(this._operation.join(""));
            } catch (e) {
                setTimeout(() =>{ this.setError()}, 1);
            }
    
        }

        calc(){
            let last = '';

            this._lastOperator = this.getLastItem();
    
            if (this._operation.length < 3) {
    
                let firstItem = this._operation[0];
                this._operation = [firstItem, this._lastOperator, this._lastNumber];
    
            }
    
            if (this._operation.length > 3) {
    
                last = this._operation.pop();
                this._lastNumber = this.getResult();
    
            } else if (this._operation.length === 3) {
    
                this._lastNumber = this.getLastItem(false);
    
            }
    
            let result = this.getResult();
    
            if (last === '%') {
    
                result /= 100;
                this._operation = [result];
    
            } else {
    
                this._operation = [result];
    
                if (last) this._operation.push(last);
            }
            this.setLastNumberToDisplay();
          
           
           
        }

           

  
        getLastItem(isOperation = true) {

            let lastItem;
    
            for (let i = this._operation.length - 1; i >= 0; i--) {
    
                if (this.isOperation(this._operation[i]) === isOperation) {
                    lastItem = this._operation[i];
                    break;
                }
    
            }
    
            if (!lastItem) {
    
                lastItem = (isOperation) ? this._lastOperator : this._lastNumber;
    
            }
    
            return lastItem;
    
        }

        setLastNumberToDisplay(){

           let lastNumber = this.getLastItem(false);
         
     
            if(!lastNumber) lastNumber = 0

            this.displayCalc = lastNumber
        
    }

        addOperation(value){

            
            if(isNaN(this.getLastOperation())){
                
                if(this.isOperation(value)){
                    this.setLastOperation(value)
                }else if (isNaN(value)){
                    
                    console.log(value)
                }else {
                    this.pushOperator(value) 
                    this.setLastNumberToDisplay()
                }

            }else {

                if (this.isOperation(value)){

                    this.pushOperator(value)

                }else{

                    let newValue = this.getLastOperation().toString() + value.toString()
                    this.setLastOperation(newValue)

                    this.setLastNumberToDisplay()

                }

                
            }
            
           
            console.log(this._operation)
        }

        setError(){
            this.displayCalc = "ERROR 404"
        }

        addDot(){

            let lastOperation = this.getLastOperation();

            if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

            if(this.isOperation(lastOperation) || !lastOperation){ 
                this.pushOperator ('0.');

            }else{
               this.setLastOperation(lastOperation.toString() + '.') 
            }
            this.setLastNumberToDisplay();
            console.log(lastOperation)

        }

        execBtn(value){

            this.playAudio()

            switch (value) {
                case 'ac':
                    this.clearAll()
                break
                case 'ce':
                    this.clearEntry()
                break
                case 'soma':
                    this.addOperation('+')
                break
                case 'subtracao':
                    this.addOperation('-')
                break
                case 'multiplicacao':
                    this.addOperation('*')
                break
                case 'divisao':
                    this.addOperation('/')
                break
                case 'porcento':
                    this.addOperation('%')
                break
                case 'igual':
                    this.calc('=')
                    
                break
                case 'ponto':
                    this.addDot()
                break

                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':

                this.addOperation(parseInt(value))

                    break;

                default:
                  
                break

            }
        }


        initButtonsEvent(){
            let buttons = document.querySelectorAll("#buttons > g, #parts > g")
        
            buttons.forEach((btn, index)=>{
                this.addEventListenerAll(btn ,'click drag', e =>{
                   let textbtn =  btn.className.baseVal.replace("btn-","")
                   this.execBtn(textbtn);
                })

                this.addEventListenerAll(btn , "mouseover mouseup mousedown", e =>{
                    btn.style.cursor = "pointer"
                }) 

            })
                
        }

    get displayTime(){
        return this._HoraCalcEl.innerHTML
    }
    set displayTime(value){
        return this._HoraCalcEl.innerHTML = value
    }
    get displayDate(){
        return this._DateCalcEl.innerHTML;
    }
    set displayDate(value){
        return this._DataCalcEl.innerHTML = value
    }




    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(valor){
        if(valor.toString().length > 10){
            this.setError();
            return;
        }
        this._displayCalcEl.innerHTML = valor;
    }

    get dataAtual(){
        return new Date();

    }

    set dataAtual(valor){
        this._currentDate = valor;
    }

}