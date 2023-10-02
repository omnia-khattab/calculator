class Calculator{
 constructor(previousOperandText,currentOperandText){
    this.currentOperandText=currentOperandText;
    this.previousOperandText=previousOperandText;
    this.clear();
 }  
 clear(){
    this.operator=undefined;
    this.previousOperand='';
    this.currentOperand='';
    this.previousOperandText.innerHTML='';
    //this.equalButtonPressed = false;
 }

 delete(){
    // slice(start,end) , => -1 indicate to the last index , slice doesn't include the end index i set
    this.currentOperand=this.currentOperand.slice(0,-1);
 }

 appendNumber(number){
    if(number === '.' && this.currentOperand.includes('.')) return;
    if(this.currentOperand === '' && number === '0') return;
    
    this.currentOperand =this.currentOperand.toString() + number.toString();
 }
 addOperator(operator){
    if(this.currentOperand === '') return;
    if(this.previousOperand !== ''){
        this.calculate();
    }
    this.operator=operator;
    this.previousOperand=`${this.currentOperand} ${operator}`;
    this.currentOperand = '';
 }
 display(){
    this.currentOperandText.innerHTML=this.currentOperand;
    if(this.operator != null){
        this.previousOperandText.innerHTML=this.previousOperand;
    }
    if(this.equalButtonPressed){
        this.clear();
        this.equalButtonPressed=false;
    }
 } 
 calculate(){
    const previousNumber=parseFloat(this.previousOperand);
    const currentNumber=parseFloat(this.currentOperand);
    let result;
    if(isNaN(previousNumber) || isNaN(currentNumber)) return;

    switch (this.operator) {
        case '+':
            result = previousNumber + currentNumber;
            break;

        case '-':
            result = previousNumber - currentNumber;
            break;

        case '*':
            result = previousNumber * currentNumber;
            break;

        case '÷':
        result = previousNumber / currentNumber;
        break;

        default:
            break;
    }
    this.currentOperand=result;
    this.previousOperand='';
    this.operator=undefined;
    this.equalButtonPressed=true;
 }

}

const numberButton=document.querySelectorAll(".number");
const operatorButton=document.querySelectorAll(".operator");
const equalButton=document.querySelector(".equal");
const allClearButton=document.querySelector(".clear");
const deleteButton=document.querySelector(".delete");
const previousOperandText=document.querySelector(".prev-operator");
const currentOperandText=document.querySelector(".curr-operator");

const calculatorObject=new Calculator(previousOperandText,currentOperandText);

numberButton.forEach(button=>{
    button.addEventListener('click',()=>{
        calculatorObject.appendNumber(button.innerHTML);
        calculatorObject.display();
    });
});
operatorButton.forEach(operator=>{
    operator.addEventListener('click',()=>{
        calculatorObject.addOperator(operator.innerHTML);
        calculatorObject.display();
    });
});
equalButton.addEventListener('click',()=>{
    calculatorObject.calculate();
    calculatorObject.display();
});
allClearButton.addEventListener('click',()=>{
    calculatorObject.clear();
    calculatorObject.display();
});
deleteButton.addEventListener('click',()=>{
    calculatorObject.delete();
    calculatorObject.display();
});


