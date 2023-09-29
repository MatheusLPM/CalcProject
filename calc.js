
var operador = true

function inserir(num) {

    document.getElementById('tela').value +=  num
    //console.log(num)
}

function limpar(){
    document.getElementById('tela').value = "";
}

function backspace(){

    let string = document.getElementById('tela').value
    document.getElementById('tela').value = string.slice(0,-1)

}

function parenteses(){

    let display = document.getElementById('tela')

    if(operador){
    
        display.value += "("
        operador = false
    
        return 0

    }else{

        display.value += ")"
        operador = true
        
    }

}

function invert(){

    let display = document.getElementById('tela').value
    //console.log(display)

    let array = display.match(/(\d+\.\d+|\d+|[%\+\-\*\/])/g);
    //console.log(array)

    let lastElement = array[array.length - 1]
    //console.log(lastElement)


    if(!isNaN(lastElement)){

        if(array.length == 1 && array[0] != isNaN){

            array = String(array) * (-1)


        }

        if(array[array.length - 2] == "+"){
            
            //console.log(array)
            array[array.length - 2] = '-'
            array = String(array)
            display = array.replace(/,/g,'')
            document.getElementById('tela').value = display

        }else if(array[array.length -2] == "*" || array[array.length - 2] == "/"){

            console.log(array)
            array[array.length - 1] = array[array.length - 1] * (-1) 
            console.log(array)
            display = String(array).replace(/,/g,'')

            document.getElementById('tela').value = display

        }else{

            //console.log(array)

            if(array.length == 2 && array[0] == '-'){


                array.shift()
                display = array       
                document.getElementById('tela').value = display

                return 0

            }else{

                array[array.length - 2] = '+'
                //console.log(array)
    
                array = String(array)
                display = array.replace(/,/g,'')
                //console.log(array)

                document.getElementById('tela').value = display
    
            }          
        } 
    }else{
        console.log('Erro')
    }
}

function calc(){


    let result = document.getElementById('tela').value
    console.log(result)
    let removeElement = "-"
    //result = result.replace(/[()]/g,'')
    //console.log(result)

    let array = result.match(/(\d+\.\d+|\d+|[%\+\-\*\/])/g);   
    //console.log(array)

    if(array[0] == '-' || array[0] == '+'){
        console.log(array)
        array.unshift(0)
        result = String(array).replace(/,/g,'')
        console.log(result)
        
    }

    if(array.length%2 == 0){

        if(array[array.length - 2 ] == "-"){

            array = array.filter(item => item !== removeElement)
            result = String(array).replace(/,/g,'')
            console.log(result)
    
            let newValue = expressao(result)
    
            document.getElementById('tela').value = newValue
    
            return 0
    
        }

    }/*else{

        if(array[array.length - 2 ] == "-"){

            array = array.filter(item => item !== removeElement)
            result = String(array).replace(",",'')
            console.log(result)
            let newValue = expressao(result)   
            document.getElementById('tela').value = newValue
    
            return 0
    
        }
    }*/


    try {

        for (let i = 0; i < result.length; i++){

            if(result[i] == "%"){

                result = result.replace("%","*") 
                newOperation = expressao(result)

                newOperation = newOperation/100

                document.getElementById('tela').value = newOperation
                //console.log(newOperation)

                return 0

            }else{
          
                document.getElementById('tela').value = expressao(result)       

            }

        }
            
    } catch (error) {

        console.log('Erro: Não foi possivel executar')
        
    }
    
}


function expressao (display){

    let array = display.match(/(\d+\.\d+|\d+|[%\+\-\*\/])/g);
    //console.log(array)

    let result = parseFloat(array[0]);


    for (let i = 1; i < array.length; i += 2) {

        let operador = array[i];

        let number = parseFloat(array[i + 1]);

        switch (operador) {

            case '+':

                result += number;
                break;

            case '-':

                result -= number;
                break;

            case '*':

                result *= number;
                break;

            case '/':

                if (number === 0) {
                    console.log('Divisão por zero');
                }

                result /= number;
                break;

            case '%' :
                break;
            
            default:
                console.log('Operador desconhecido');
        }
    }

    return result;

}