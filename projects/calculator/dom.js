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