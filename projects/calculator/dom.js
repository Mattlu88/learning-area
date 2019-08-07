const btns = [...document.querySelectorAll('button')];
btns.forEach((btn) => {
  btn.classList.add('border-0');
  btn.classList.add('w-100');
})

const btnDivs = document.querySelectorAll('.col-3');
btnDivs.forEach((div) => {
  div.classList.add('p-0');
  div.classList.add('pr-2');
})

var currentOutput = {

  outputElmnt: document.querySelector('#output'),

  get result() {
    return this.outputElmnt.innerHTML;
  }, 

  set result(value) {
    this.outputElmnt.innerHTML = value;
  },

  enterNumber(value) {
    if (value === '.') { 
      if (this.isWholeNumber(this.result)) {
        this.result = this.result + value;
      }
    } else {   // Enterd a number
      if (this.isWholeNumber(this.result)) {
        this.result = Number(this.result) * 10 + Number(value);
      } else {
        this.result = this.result + value;
      }
    }
  },

  isWholeNumber(value) {
    return value.indexOf('.') < 0 ? true : false;
  },

  allClear() {
    this.result = 0;
  }

};

var calculation = {
  
  changeSign(value) {
    return Number(value) * -1;
  },

  percentage(value) {
    return Number(value) / 100;
  }
};

const numberBtns = document.getElementsByName('number');
numberBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {currentOutput.enterNumber(e.target.value)});
});

const allClearBtn = document.querySelector('#all-clear-btn');
allClearBtn.addEventListener('click', () => {currentOutput.allClear()});

const plusMinusBtn = document.querySelector('#plus-minus-btn');
plusMinusBtn.addEventListener('click', () => {
  currentOutput.result = calculation.changeSign(currentOutput.result);
});

const percentBtn = document.querySelector('#percent-btn');
percentBtn.addEventListener('click', () => {
  currentOutput.result = calculation.percentage(currentOutput.result);
});


/*
let currNum;  // Current number entry
let currOperation; // Current operation entry
let firstOpd; // the first operand stored
let secondOpd; // the second operand stored
let thirdOpd; // the third operand stored
let firstOperation;   // the first operation stored
let secondOperation; // the second operation stored

if numbers clicked {
  if firstOpd !== null {
    if secondOpd === null {
      set firstOperation = currentOperation    2 *
    }
  }
  set currNum;
}

if operations clicked {
  set currOperation;

  if firstOpd === null {
    set firstOpd = currOpd;      2
  } else {
     if secondOpd  !== null {   2 * 3
        if secondOperation === null {
          if currOperation is multiply or divide {       
            if firstOperation is multiply  or  divide {   2 * 3 *
              set firstOperand = result
              set firstOperation = currentOperation       
              set secondOpd = null               
              output is result    6 *
            } else {  first operation is +/-/=          2 + 3 *
              set secondOperation = currentOperation
              output is secondOpd    3 *
            }
          } else {   current operation is +/-
            if firstOperation is multiply or divide {          2 * 3 +
              set firstOperand = result
              set firstOperation = currentOperation       
              set secondOpd = null               
              output is result    6 +
            } else { first operation is +/-/=      2 + 3 +
              set firstOperand = result
              set firstOperation = currentOperation       
              set secondOpd = null               
              output is result    5 +
            }
          }
        } else {    2 + 3 * 4 
          let thirdOpd = currNum
          if current operation is  * or / {    2 + 3 * 4 *
            set secondOpd = secondOpd secondOperation thirdOpd
            set thirdOpd = null
            set secondOpd = currOperation
            output is secondOpd        12 *
          } else {   current operation is +/-      2 + 3 * 4 +
              set firstOperand = result
              set firstOperation = currentOperation       
              set secondOpd = null               
              set thirdOpd = null
              set secondOperation = null
              output is result    14 +
          }
        }
      }
    }
  }
}


let currNum;
let currOperation;
let oprdOne;
let oprdTwo;
let oprdThree;
let opOne;
let opTwo;

if numbers entered {
  set currNum;
  if oprdOne !== null && opOne === null {
    set opOne = currOperation;
    set currOperation = null;
  }
}

if operations entered {
  set currOperation;
  if oprdOne === null {
    set oprdOne = currNum;
    return;   // continue input
  }
  if opOne === null {
    return;   // changing operations;
  }
  if oprdTwo === nul {
    set oprdTwo = currNum;
    if opOne >= currOperation {
      set oprdOne = opOne(oprdOne, oprdTwo);
      set oprdTwo = null;
      set opOne = currOperation;
      ouput = oprdOne;
    } else {
      set opTwo = currOperation;
      output = oprdTwo;
    }
    return;
  }
  if opTwo === currOperation {
    set oprdTwo = opTwo(oprdTwo, currNum);
    set opTwo === currOperation; 
    output = oprdTwo;
  } else {
    set oprdOne = opOne(oprdOne, opTwo(oprdTwo, currNum));
    set oprdTwo = null;
    set opOne = currOperation;
    set opTwo = null;
    output= oprdOne;
  }
}

*/