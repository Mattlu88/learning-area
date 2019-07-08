const lsName  = 'issueList'; // local storage name

var view = {
    uniqueNum: 0,

    getUniqueNum : function () {
        this.uniqueNum++;
        return 'w_' + this.uniqueNum;
    },

    issueDivId: [],

    setIssueDivId : function (id) {
        this.issueDivId.push(id);
    },

    getLatestIssueId : function () {
        return this.issueDivId.slice(this.issueDivId.length-1, this.issueDivId.length);
    },

    // Create elements for issue display
    createIssueElements : function () {
        // The root node
        let sect = document.getElementById('issues-area');
        // Create a div container for each issue
        let div = document.createElement('DIV');
        div.className = 'issue-container';
        div.id = this.getUniqueNum();
        this.setIssueDivId(div.id);
        sect.insertBefore(div, sect.firstChild);

        // Create <p> to display issue id
        let p = document.createElement('P');
        p.innerHTML = 'Issue ID: '
        p.className = 'bold-par';
        p.id = this.getUniqueNum();
        div.appendChild(p);
        let idData = document.createElement('DATA');
        idData.id = this.getUniqueNum();
        p.appendChild(idData);

        // Create a button to display issue status
        let statusBtn = document.createElement('BUTTON');
        statusBtn.innerHTML = 'open';
        statusBtn.className = 'status-btn';
        statusBtn.classList.add('open-bg');
        statusBtn.id = this.getUniqueNum();
        div.appendChild(statusBtn);

        // Create a h3 to display issue description
        let descH3 = document.createElement('H3');
        descH3.id = this.getUniqueNum();
        div.appendChild(descH3);

        let iconDiv = document.createElement('DIV');
        iconDiv.className = 'icon-div';
        iconDiv.id = this.getUniqueNum();
        div.appendChild(iconDiv);
        // Create a <i> to display the icon
        let severIcon = document.createElement('I');
        severIcon.innerHTML = 'access_time';
        severIcon.className = 'material-icons md-18';
        severIcon.id = this.getUniqueNum();
        iconDiv.appendChild(severIcon);
        // Create <p></p> to display issue severity
        let severP = document.createElement('P');
        severP.className = 'name-after-icon';
        severP.id = this.getUniqueNum();
        iconDiv.appendChild(severP);

        let respIcon = document.createElement('I');
        respIcon.innerHTML = 'person';
        respIcon.className = 'material-icons md-18';
        respIcon.id = this.getUniqueNum();
        iconDiv.appendChild(respIcon);
        // Create <p><img></p> to display responsible person 
        let respP = document.createElement('P');
        respP.className = 'name-after-icon'
        respP.id = this.getUniqueNum();
        iconDiv.appendChild(respP);

        let btsDiv = document.createElement('DIV');
        btsDiv.id = this.getUniqueNum();
        div.appendChild(btsDiv);
        //Create close button
        let closeBtn = document.createElement('BUTTON');
        closeBtn.innerHTML = 'Closed';
        closeBtn.className = 'operate-btn'
        closeBtn.classList.add('close-btn');
        closeBtn.classList.add('closed-bg');
        //closeBtn.id = "close-btn";
        closeBtn.id = this.getUniqueNum();
        closeBtn.setAttribute('type', 'submit');
        btsDiv.appendChild(closeBtn);
        //Create delete button
        let deleteBtn = document.createElement('BUTTON');
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.className = 'operate-btn';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.id = this.getUniqueNum();
        closeBtn.setAttribute('type', 'submit');
        btsDiv.appendChild(deleteBtn);
    },

    // Remove the elements when delete button clicked
    removeIssueElements : (elmtId) => {
        document.getElementById(elmtId).remove();
    },

    displayIssue : function (elmtId, issueObj) {
        let issueDiv = document.getElementById(elmtId);
        let dataElmt = issueDiv.getElementsByTagName('data')[0];
        dataElmt.innerHTML = issueObj.id;
        let severPara = issueDiv.getElementsByClassName('name-after-icon')[0];
        severPara.innerHTML = issueObj.severity;
        let respPara = issueDiv.getElementsByClassName('name-after-icon')[1];
        respPara.innerHTML = issueObj.responsible;
    },

}; 

var controller  = {
    getIssueList : () => !localStorage.getItem(lsName) ? [] : JSON.parse(localStorage.getItem(lsName)),

};

//constructor
var Issue = function(id, description, severity, responsible, status) {
    this.id = id,
    this.description = description,
    this.severity = severity,
    this.responsible = responsible,
    this.status = status
};


window.onload = function() {
    //show Issues here
    showIssues(controller.getIssueList());

    let addBtn = document.querySelector("#add-btn");
    addBtn.addEventListener('click', e => addIssue());

    let deleteBtnList = [...document.querySelectorAll(".delete-btn")];
    deleteBtnList.forEach(btn => btn.addEventListener('click', e => deleteIssue(e)));

    let closeBtnList = [...document.querySelectorAll(".close-btn")];
    closeBtnList.forEach(btn => btn.addEventListener('click', e => closeIssue(e)));
}

function addIssue() {
    let inputList = [...document.querySelectorAll(".form-input")];
    if (inputList.some(inputElement => !inputElement.value)) {
        return;
    }

    let issueList = controller.getIssueList();
    let newIssue = new Issue();
    newIssue.id = getUniqueIssueId();
    newIssue.status = 'open';
    for (let i=0; i<inputList.length; i++) {
        newIssue[inputList[i].name] = inputList[i].value;
    }
    issueList.push(newIssue);
    //localStorage.setItem("issueList", issueList);
    localStorage.setItem(lsName, JSON.stringify(issueList));
}

function deleteIssue(elmnt) {
    let issueContainer = elmnt.target.parentElement.parentElement;
    let issueId = issueContainer.getElementsByTagName('data')[0].innerHTML;
    let issueList = controller.getIssueList();
    localStorage.setItem(lsName, JSON.stringify(issueList.filter(obj => obj.id !== issueId)));
    view.removeIssueElements(issueContainer.id);
}

function closeIssue(elmnt) {
    let issueContainer = elmnt.target.parentElement.parentElement;
    let issueId = issueContainer.getElementsByTagName('data')[0].innerHTML;
    let issueList = controller.getIssueList();
    let currentIssue = issueList.find(obj => obj.id === issueId);
    // Change issue status
    if (currentIssue.status === 'open') {
        issueList[issueList.indexOf(currentIssue)].status = 'closed';
    } else {
        issueList[issueList.indexOf(currentIssue)].status = 'open';
    }
    localStorage.setItem(lsName, JSON.stringify(issueList));
    let statusBtn = issueContainer.getElementsByClassName('status-btn')[0];
    setStatusBtn(statusBtn, currentIssue.status);
    let closeBtn = issueContainer.getElementsByClassName('operate-btn')[0];
    setCloseBtn(closeBtn, currentIssue.status);
}

function getUniqueIssueId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
}

function showIssues(issueList) {
    if (!issueList) {
        return;
    }
    issueList.forEach((e) => showSingleIssue(e)); 
}

function showSingleIssue(singleIssue) {
    view.createIssueElements();
    view.displayIssue(view.getLatestIssueId(), singleIssue);
}

function setStatusBtn(elmt, status) {
    if (status === 'open') {
        elmt.innerHTML = 'Open';
        elmt.classList.remove('closed-bg');
        elmt.classList.add('open-bg');
    } else {
        elmt.innerHTML = 'Closed';
        elmt.classList.remove('open-bg');
        elmt.classList.add('closed-bg');
    }
}

function setCloseBtn(elmt, status) {
    if (status === 'open') {
        elmt.innerHTML = 'Close';
        elmt.classList.remove('open-bg');
        elmt.classList.add('closed-bg');
    } else {
        elmt.innerHTML = 'Open';
        elmt.classList.remove('closed-bg');
        elmt.classList.add('open-bg');
    }
}