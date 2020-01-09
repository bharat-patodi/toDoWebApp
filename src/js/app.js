/*
-------------------------------------------------
The main code
-------------------------------------------------
*/
window.onload = init;
const choreContainer = document.getElementById('entries');
const allEntries = document.getElementsByClassName('singleChore');
const entryList = document.getElementById('entries').getElementsByTagName('input');
const checkedAttribs = [];
const classHidden = [];

/*
-------------------------------------------------
Initialization
-------------------------------------------------
*/

function init() {
    choreContainer.innerHTML = localStorage.getItem('previousState');
    restoreChkbxStatus(entryList.length, 0);
    showRemoveBtn();
}

/*
-------------------------------------------------
Adding a new entry
-------------------------------------------------
*/
function addEntry(e) {
    // Preventing form submission
    e.preventDefault();

    // Getting the value of the new entry
    const previousEntries = choreContainer.innerHTML;
    const newEntry = document.getElementById('chore').value;

    // Check if chore is empty
    if (newEntry != "") {

        checkState();
        // If chore is not empty, append the new entry above the old ones
        const newEntryTemplate = "<li class = \"singleChore\"><input type=\"checkbox\"><span>" + newEntry + "</span></input><span class = \"delete-single-chore\" onclick = \"removeOne(event)\" >&times;</span></li>";

        choreContainer.innerHTML = newEntryTemplate + previousEntries;
        restoreChkbxStatus(entryList.length - 1, 1);
        checkState();

        // Clean up the textarea box
        document.getElementById('chore').value = "";

        // Data persistence -- Local storage
        localStorage.setItem('previousState', choreContainer.innerHTML);
        // localStorage.setItem('previousStyles', window.getComputedStyle(choreContainer));
        // console.log(window.getComputedStyle(choreContainer));
        // console.log(allEntries);

        showRemoveBtn();
    }
    // If chore is empty, intimate the user
    else {
        alert("You have not entered anything.");
    }
}

/*
-------------------------------------------------
Storing the attribute values of the checkboxes
-------------------------------------------------
*/
function checkState() {
    for (var j = 0; j < entryList.length; j++) {
        checkedAttribs[j] = entryList[j].checked;
        // Verify the checked values with a console statement
        // console.log(entryList[j].checked + "" + j);
        classHidden[j] = entryList[j].parentNode.style.display;
    }
    console.log(classHidden);
    localStorage.setItem('checkboxStatuses', JSON.stringify(checkedAttribs));
    localStorage.setItem('displayStatuses', JSON.stringify(classHidden));
}

/*
-------------------------------------------------
Restoring the checkbox statuses
-------------------------------------------------
*/

function restoreChkbxStatus(len, increment) {
    const testArray = JSON.parse(localStorage.getItem('checkboxStatuses'));
    const anotherArray = JSON.parse(localStorage.getItem('displayStatuses'));
    for (var k = 0; k < len; k++) {
        entryList[k + increment].checked = testArray[k];
        entryList[k + increment].parentNode.style.display = anotherArray[k];

    }
}


/*
-------------------------------------------------
Removing a single entry - use e.target Also read up event bubbling for making this event binding a relatively inexpensive affair.
-------------------------------------------------
*/

function removeOne(event) {
    // Using this method instead of the removeChild method because of the ease of data persistence. I am sure I could do persistence with removeChild too, but the solution hasn't yet presented itself to me.
    const thisChore = event.target.parentNode;
    thisChore.style.display = 'none';
    // event.target.parentNode.classList.toggle("hide");
    // thisChore.parentNode.removeChild(thisChore);
}

/*
-------------------------------------------------
Removing all the entries at once.
-------------------------------------------------
*/

function removeAll() {
    localStorage.clear();
    window.location.reload();
}

/*
-------------------------------------------------
Show the Remove All button if there are more than one entries.
-------------------------------------------------
*/

function showRemoveBtn() {
    if (document.getElementById('entries').childElementCount > 1) {
        document.getElementById('removeBtn').style.display = 'initial';
    }
}

/*
-------------------------------------------------
(e) Reordering the list items
(f) Edit the items
(h) Filter
(i) Sort
(j) RemoveAll button get shown when there are hidden elements

(a) Done - Add the checkbox statuses at page reloads and remove alls.
(j) The checked one should go down
(b) Done - On reload, the state of the removed chores gets reset.
(b) Done - Remove single items
(c) Done - RWD
(d) Done - Styling
(g) Done - Bug: The topmost item that's ticked loses its state with page reload
-------------------------------------------------
*/
