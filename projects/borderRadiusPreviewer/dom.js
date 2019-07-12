
var radiusInputs = [...document.getElementsByClassName("radius-input")];

radiusInputs.forEach((rInput) => {
    const borderDiv = document.getElementById("border-div");
    const initRaidus = "11";
    rInput.addEventListener("input", ()=> {
        setBorderRadius(borderDiv, rInput);
    });
    rInput.value = initRaidus;
    setBorderRadius(borderDiv, rInput);
});

function setBorderRadius(div, elmnt) {
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

    const textarea = document.getElementById("display-text");
    setTextarea(div, textarea);

    function setTextarea(div, textarea) {
        const browserTypes = [...document.getElementsByClassName("browser-type")];
        browserTypes.forEach((type) => {
            switch (type.id) {
                case "webkit":
                    textarea.innerHTML = "-webkit-border-radius: "
                    break;
                case "gecko":
                    textarea.innerHTML = "-moz-border-radius: "
                    break;
                case "css3":
                    textarea.innerHTML = "border-radius: "
                    break;
            };
            textarea.innerHTML +=  div.style.borderRadius + ";";
        });
    };
};