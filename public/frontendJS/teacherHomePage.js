// hidden tables
document.getElementById("recentQuizzes").style.display = "none";
document.getElementById("sortedActivities").style.display = "none";

// on page load, display sorted recent activity table if entries exist
document.addEventListener("DOMContentLoaded", function()
{
    sortTable();
});

// sort the table by date
function sortTable()
{
    // snippet of code from https://stackoverflow.com/questions/8231310/convert-table-to-an-array
    // store table data into array
    var array = [];
    var headers = [];
    
    // get table headers into array
    $('#activityTable th').each(function(index, item) {
        headers[index] = $(item).html();
    });

    // store table body by correct column
    $('#activityTable tr').has('td').each(function() {
        var arrayItem = {};
        $('td', $(this)).each(function(index, item) {
            arrayItem[headers[index]] = $(item).html();
        });
        array.push(arrayItem);
    });

    // sort array by date desc
    array.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    });

    // console.log(array);
    
    // display array as table sorted by date if entries exist
    if (array[0] != null)
    {
        document.getElementById("sortedActivities").style.display = "block";
        var sortedTable = document.getElementById("sortedTable");
        generateTable(sortedTable, array);
    }
}

// code snippet from https://www.valentinog.com/blog/html-table/
// inserts entries into table from data in array
function generateTable(table, data)
{
    var i = 0;
    for (let element of data) {
        let row = table.insertRow();
            for (key in element)
            {
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                cell.innerHTML = text.textContent;
                // console.log(cell);
            }
    }
}

// When the user clicks on the Results button...
function fetchResults(studentID)
{
    // Create a XMLHttpRequest object.
    var req = new XMLHttpRequest();

    // Define the URL to send data to.
    var url = "/teacherScoreboard";

    // Open a connection.
    req.open("POST", url, true);

    // Set the request header.
    req.setRequestHeader('Content-Type', 'application/json');

    // Create a state change callback.
    req.onreadystatechange = function()
    {
        // TEST: Output response from server.
        // console.log(req);
        
        /* IF response from server is good and the response has completed, 
        redirect user to the teacherScoreboard page. */
        if (req.readyState == 4 & req.status == 200)
        {
            window.location = "/teacherScoreboard";
        }
    };

    // Convert JSON data to string.
    var data = JSON.stringify({"fromTeacherHomeID": studentID});

    // Send data with the request.
    req.send(data);
}