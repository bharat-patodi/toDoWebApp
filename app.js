/*
-------------------------------------------------
The main code
-------------------------------------------------
*/
window.onload = init;
const allEntries = document.getElementById('entries');
const entryList = document.getElementById('entries').getElementsByTagName('input');
const checkedAttribs = [];

/*
-------------------------------------------------
Initialization
-------------------------------------------------
*/

function init() {
    allEntries.innerHTML = localStorage.getItem('previousState');
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
    const previousEntries = allEntries.innerHTML;
    const newEntry = document.getElementById('chore').value;

    // Check if chore is empty
    if (newEntry != "") {

        checkState();
        // If chore is not empty, append the new entry above the old ones
        const newEntryTemplate = "<li class = \"allEntries\"><input type=\"checkbox\"><span>" + newEntry + "</span></input></li>";

        allEntries.innerHTML = newEntryTemplate + previousEntries;

        restoreChkbxStatus(entryList.length - 1, 1);
        checkState();

        // Clean up the textarea box
        document.getElementById('chore').value = "";

        // Data persistence -- Local storage
        localStorage.setItem('previousState', allEntries.innerHTML);

        showRemoveBtn();
    }
    // If chore is empty, intimate the user
    else {
        alert("Please enter a valid entry.");
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
        console.log(entryList[j].checked + "" + j + "940989");
    }
    localStorage.setItem('checkboxStatuses', JSON.stringify(checkedAttribs));
}

/*
-------------------------------------------------
Restoring the checkbox statuses
-------------------------------------------------
*/

function restoreChkbxStatus(len, increment) {
    const testArray = JSON.parse(localStorage.getItem('checkboxStatuses'));
    for (var k = 0; k < len; k++) {
        entryList[k + increment].checked = testArray[k];
    }
}


/*
-------------------------------------------------
Removing a single entry - use e.target Also read up event bubbling for making this event binding a relatively inexpensive affair.
-------------------------------------------------
*/



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
(a) Add the checkbox statuses at page reloads and remove alls.
(c) RWD
(d) Styling
(e) Reordering the list items
(f) Edit the items
(g) Bug: The topmost item that's ticked loses its state with page reload
(h) Filter
(i) Sort
(j) The checked one should go down
-------------------------------------------------
*/
