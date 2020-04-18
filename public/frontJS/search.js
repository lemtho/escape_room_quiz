document.getElementById("search_quiz").style.display = "none";
document.getElementById("search_student").style.display = "none";

document.getElementById("submitSearch").addEventListener("click", function(appear)
{	
    document.getElementById("search_quiz").style.display = "block";
    document.getElementById("search_student").style.display = "block";
	appear.preventDefault();
});