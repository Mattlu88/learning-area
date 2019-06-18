const lsName  = 'issueList'
 
var Issue = function() {
    this.id,
    this.description,
    this.severity,
    this.responsible,
    this.status
}

window.onload = function() {
    //show Issues here
    showIssues();
    let addBtn = document.querySelector("#add-btn");
    addBtn.addEventListener('click', e => addIssue());

    let deleteBtnList = [...document.querySelectorAll("#delete-btn")];
    deleteBtnList.forEach(btn => btn.addEventListener('click', e => deleteIssue(e)));

    let closeBtnList = [...document.querySelectorAll("#close-btn")];
    closeBtnList.forEach(btn => btn.addEventListener('click', e => closeIssue(e)));
}

function getIssueList() {
    return !localStorage.getItem(lsName) ? [] : JSON.parse(localStorage.getItem(lsName));
}

function addIssue() {
    let inputList = [...document.querySelectorAll(".form-input")];
    if (inputList.some(obj => !obj.value)) {
        return;
    }

    let issueList = getIssueList();
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
    let issueId = elmnt.target.parentElement.parentElement.id;
    let issueList = getIssueList();
    localStorage.setItem(lsName, JSON.stringify(issueList.filter(obj => obj.id !== issueId)));
    let issueDiv = document.getElementById(issueId);
    issueDiv.remove();
}

function closeIssue(elmnt) {
    let issueId = elmnt.target.parentElement.parentElement.id;
    let issueList = getIssueList();
    localStorage.setItem(lsName, JSON.stringify(issueList.map(obj => {
                                                                if (obj.id === issueId) {
                                                                    obj.status = 'closed';
                                                                }
                                                                 return obj;
                                                            })));
    let issueDiv = document.getElementById(issueId);
    let statusBtn = issueDiv.getElementsByClassName('status-btn')[0];
    statusBtn.innerHTML = 'closed';
    setStatusBtn(statusBtn, 'closed');
}

function getUniqueIssueId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
}

function showIssues() {
    let issueList = getIssueList()
    if (!issueList) {
        return;
    }

    issueList.forEach(obj => showEachIssue(obj)); 
}

function showEachIssue(issueObj) {
    let sect = document.getElementById('issues-area');

    // Create div container for each issue
    let div = document.createElement('DIV');
    div.className = 'issue-container';
    // In order to get the issue easier when the btn get clicked 
    div.id = issueObj.id;
    //sect.appendChild(div);
    sect.insertBefore(div, sect.firstChild);

    // Create <p> to display issue id
    let p = document.createElement('P');
    p.innerHTML = 'Issue ID: '
    p.className = 'bold-par';
    div.appendChild(p);
    let idData = document.createElement('DATA');
    idData.innerHTML = issueObj.id;
    idData.id = 'issue-id';
    p.appendChild(idData);

    // Create a button to display issue status
    let statusBtn = document.createElement('BUTTON');
    statusBtn.innerHTML = issueObj.status;
    statusBtn.className = 'status-btn';
    setStatusBtn(statusBtn, issueObj.status);
    div.appendChild(statusBtn);

    // Create a h3 to display issue description
    let descH3 = document.createElement('H3');
    descH3.innerHTML = issueObj.description;
    div.appendChild(descH3);

    let iconDiv = document.createElement('DIV');
    iconDiv.className = 'icon-div';
    div.appendChild(iconDiv);
    // Create a <i> to display the icon
    let severIcon = document.createElement('I');
    severIcon.innerHTML = 'access_time';
    severIcon.className = 'material-icons md-18';
    iconDiv.appendChild(severIcon);
    // Create <p></p> to display issue severity
    let severP = document.createElement('P');
    severP.innerHTML = issueObj.severity;
    severP.className = 'name-after-icon';
    iconDiv.appendChild(severP);

    let respIcon = document.createElement('I');
    respIcon.innerHTML = 'person';
    respIcon.className = 'material-icons md-18';
    iconDiv.appendChild(respIcon);
    // Create <p><img></p> to display responsible person 
    let respP = document.createElement('P');
    respP.innerHTML = issueObj.responsible;
    respP.className = 'name-after-icon'
    iconDiv.appendChild(respP);

    let btsDiv = document.createElement('DIV');
    div.appendChild(btsDiv);
    //Create close button
    let closeBtn = document.createElement('BUTTON');
    closeBtn.innerHTML = 'Close'
    closeBtn.className = "operate-btn"
    setCloseBtn(closeBtn, issueObj.status);
    closeBtn.id = "close-btn";
    closeBtn.setAttribute('type', 'submit');
    btsDiv.appendChild(closeBtn);
    //Create delete button
    let deleteBtn = document.createElement('BUTTON');
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.className = "operate-btn"
    deleteBtn.id = "delete-btn";
    closeBtn.setAttribute('type', 'submit');
    btsDiv.appendChild(deleteBtn);

}

function setStatusBtn(elmt, status) {
    if (status === 'open') {
        elmt.classList.remove('closed-bg');
        elmt.classList.add('open-bg');
    } else {
        elmt.classList.remove('open-bg');
        elmt.classList.add('closed-bg');
    }
}

function setCloseBtn(elmt, status) {
    if (status === 'open') {
        elmt.classList.remove('open-bg');
        elmt.classList.add('closed-bg');
    } else {
        elmt.classList.remove('closed-bg');
        elmt.classList.add('open-bg');
    }
}