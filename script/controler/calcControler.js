class CalcController{

    
    constructor () {

        this._operation = []

        this._displayCalcEl = document.querySelector("#display");
        this._DataCalcEl = document.querySelector("#data");
        this._HoraCalcEl = document.querySelector("#hora");


        
        this._displayCalc;
        this._currentDate;
        this.initialize ();
        this.initButtonsEvent()
        
        
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

    }

        addEventListenerAll(element,events, fn){
            events.split(' ').forEach(event =>{
                element.addEventListener(event ,fn, false)
            })
        }

        clearAll(){
            this._operation = []

        }
        clearEntry(){
            this._operation.pop()

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

        addOperation(value){

            console.log('A',this.getLastOperation() )
            
            if(isNaN(this.getLastOperation())){
                
                if(this.isOperation(value)){
                    this.setLastOperation(value)
                }else if (isNaN(value)){
                    
                    console.log(value)
                }else {
                    this._operation.push(value) 
                }

            }else {
                let newValue = this.getLastOperation().toString() + value.toString()
                this.setLastOperation(parseInt(newValue))
            }
            
           
            console.log(this._operation)
        }

        setError(){
            this.displayCalc = "ERROR 404"
        }


        execBtn(value){
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
                    
                break
                case 'ponto':
                    this.addOperation('.')
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
        this._displayCalcEl.innerHTML = valor;
    }

    get dataAtual(){
        return new Date();

    }

    set dataAtual(valor){
        this._currentDate = valor;
    }

}