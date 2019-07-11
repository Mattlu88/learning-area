var view = {
    binaryInput: document.getElementById("binary-entry"),
    decimalOutput: document.getElementById("decimal-result"),
    convertBtn: document.getElementById("convert-btn"),
    resetBtn: document.getElementById("reset-btn"),
    alertDiv: document.getElementById("alert-div"),
    alertMsg: document.getElementById("alert-msg"),
    closeAlertBtn: document.getElementById("close-alert"),

    displayAlertMsg(msg) {
        this.alertDiv.classList.add("alert");
        this.alertDiv.classList.add("alert-warning");
        this.alertMsg.innerHTML = msg;
    },
    
    removeAlertMsg() {
        this.alertDiv.classList.remove("alert");
        this.alertDiv.classList.remove("alert-warning");
        this.alertMsg.innerHTML = "";
    }
};

var controller = {
    isInputNull(elmnt) {
        return elmnt.value.length === 0;
    },

    isBinary(s) {
        for (let i=0; i<s.length; i++){
            if (!RegExp("[01]").test(s.charAt(i))){
                return false;
            }; 
        };
        return true;
    },

    validInput() {
        if (this.isInputNull(view.binaryInput)) {
            view.displayAlertMsg("Please enter binary number.");
            return false;
        };

        if (!this.isBinary(view.binaryInput.value)) {
           view.displayAlertMsg("The binary number should only use 0 and 1.");
           return false;
        };
        return true;
    },

    convertToDec() {
        view.removeAlertMsg();
        if (this.validInput()) {
            view.decimalOutput.value = this.convertedDec(view.binaryInput.value);
        } else { 
            setTimeout(view.removeAlertMsg, 3000);
            view.binaryInput.focus();
        };
    },

    convertedDec(binStr) {
        let index = 0;
        let decimal = 0;
        for (let i=binStr.length-1; i>=0; i--) {
            if (binStr[i] === '1') {
                decimal += Math.pow(2, index);
            };
            index++;
        }
        return decimal;
    },

    resetInput() {
        view.binaryInput.value = "";
        view.decimalOutput.value = "";
        view.binaryInput.focus();
    }
};

window.onload = () => {
    view.convertBtn.addEventListener('click', controller.convertToDec.bind(controller));
    view.resetBtn.addEventListener('click', controller.resetInput.bind(controller));
    view.closeAlertBtn.addEventListener('click', view.removeAlertMsg.bind(view));
};



