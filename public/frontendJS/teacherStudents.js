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

// code from https://www.w3schools.com/howto/howto_js_sort_table.asp
// sort table by column both asc/desc
function sortStudents() {
    // check value of drop down
    var e = document.getElementById("studentSort");
    var sortValue = e.options[e.selectedIndex].value;

    if (sortValue == 'sortFirst') {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("teacherStudents");
        switching = true;
        // Set the sorting direction to ascending:
        dir = "asc";
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 1; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].getElementsByTagName("td")[0];
                y = rows[i + 1].getElementsByTagName("td")[0];
                /* Check if the two rows should switch place,
                based on the direction, asc or desc: */
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } 
                else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }

            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                and mark that a switch has been done: */
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                // Each time a switch is done, increase this count by 1:
                switchcount ++;
            } 
            else {
                /* If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again. */
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }
    
    // filter by last name
    else {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("teacherStudents");
        switching = true;
        
        dir = "asc";

        while (switching) {
            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;

                x = rows[i].getElementsByTagName("td")[1];
                y = rows[i + 1].getElementsByTagName("td")[1];

                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } 
                else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }

            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount ++;
            } 
            else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

}