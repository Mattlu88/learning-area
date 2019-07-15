
const borderDiv = () => document.getElementById("border-div");
const textarea = () => document.getElementById("display-text");

const radiusInputs = () => [...document.getElementsByClassName("radius-input")];
radiusInputs().forEach((rInput) => {
    const initRaidus = "11";
    rInput.addEventListener("input", ()=> {
        setBorderRadius(borderDiv(), rInput);
    });
    rInput.value = initRaidus;
    setBorderRadius(borderDiv(), rInput);
});

const browserTypes = () => [...document.getElementsByClassName("browser-type")];
browserTypes().forEach((browserType) => {
   browserType.addEventListener("input", ()=> {
       setTextarea(borderDiv());
   }); 
});

const copyBtn = () => document.getElementById("copy-btn");
copyBtn().addEventListener("click", () => {copyTextarea()});

function setBorderRadius(div, elmnt) {
    if (elmnt.value.length > 3) {
        elmnt.classList.remove("w-25");
        elmnt.classList.add("w-50");
    } else {
        elmnt.classList.remove("w-50");
        elmnt.classList.add("w-25");
    };

    switch (elmnt.id) {
        case "top-left-input":
            div.style.borderTopLeftRadius = elmnt.value + 'px';
            break;
        case "top-right-input":
            div.style.borderTopRightRadius = elmnt.value + 'px';
            break;
        case "bottom-right-input":
            div.style.borderBottomRightRadius = elmnt.value + 'px';
            break;
        case "bottom-left-input":
            div.style.borderBottomLeftRadius = elmnt.value + 'px';
            break;

    };

    setTextarea(div);
};

function setTextarea(div) {
    textarea().innerHTML = "";
    const browserTypes = () => [...document.getElementsByClassName("browser-type")];
    browserTypes().forEach((type) => {
        if (type.checked) {
            switch (type.value) {
                case "webkit":
                    textarea().innerHTML += "-webkit-border-radius: "
                    break;
                case "gecko":
                    textarea().innerHTML += "-moz-border-radius: "
                    break;
                case "css3":
                    textarea().innerHTML += "border-radius: "
                    break;
            };
            textarea().innerHTML += div.style.borderRadius + ";\n";
        };
    });
};

function copyTextarea() {
    textarea().select();
    document.execCommand("copy");
};