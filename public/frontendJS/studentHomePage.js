// On load, hide the game.
document.getElementById("game").style.display = "none";

// IF "Go" button is clicked...
document.getElementById("goButton").addEventListener("click", function(appear)
{
    // Hide the greeting and form divs.
    document.getElementById("studentHomeDiv3").style.display = "none";
    document.getElementById("studentHomeDiv4").style.display = "none";

    // Increase height of page div.
    document.getElementById("studentHomeDiv1").style.height = "825px";
    document.getElementById("studentHomeDiv2").style.height = "825px";
    
    // Display the game.
    document.getElementById("game").style.display = "block";
    appear.preventDefault();
});