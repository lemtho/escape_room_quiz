//Hide add question form on load
document.getElementById("add_Question").style.display ="none";
document.getElementById("SAQuestion").style.display ="none";
document.getElementById("TFQuestion").style.display ="none";
document.getElementById("MCQuestion").style.display ="none";

document.getElementById("newQuestion").addEventListener("click", function(appear){
    document.getElementById("add_Question").style.display = "block";
    document.getElementById("noQuestion").style.display = "none";
    document.getElementById("SAQuestion").style.display ="none";
    document.getElementById("TFQuestion").style.display ="none";
    document.getElementById("MCQuestion").style.display ="none";
    appear.preventDefault(); 
});

//Function to display different answer prompt for different question type
//Referenced: https://www.youtube.com/watch?v=zndWZv9DZWc
function showQuestion(x){
    if(x==0){
        document.getElementById("SAQuestion").style.display ="block";
        document.getElementById("TFQuestion").style.display ="none";
        document.getElementById("MCQuestion").style.display ="none";
    }
    else if(x==1){
        document.getElementById("TFQuestion").style.display ="block";
        document.getElementById("SAQuestion").style.display ="none";
        document.getElementById("MCQuestion").style.display ="none";
    }
    else{
        document.getElementById("MCQuestion").style.display ="block";
        document.getElementById("SAQuestion").style.display ="none";
        document.getElementById("TFQuestion").style.display ="none";
    }

}

//Function to auto-select TF wrong answer based on select TF answer
function selectWrongAnswer(x){
    if(x==0){
        var wrongChoice = document.getElementById("FChoice");
        wrongChoice.checked = true; 
    }
    else{
        var wrongChoice = document.getElementById("TChoice");
        wrongChoice.checked = true; 
    }
}

//Function to auto-select TF answer based on select TF wrong answer
function selectAnswer(x){
    if(x==0){
        var wrongChoice = document.getElementById("FAnswer");
        wrongChoice.checked = true; 
    }
    else{
        var wrongChoice = document.getElementById("TAnswer");
        wrongChoice.checked = true; 
    }
}

function updateQuestion(id){
    $.ajax({
        url: '/teacherQuiz/' + id,
        type: 'PUT',
        data: $('#edit_question').serialize(),
        success: function(result){
            window.location.reload();
        }
    });
};

function addQuestion(){
    $.ajax({
        url: '/teacherQuiz/' + id,
        type: 'POST',
        data: $('#add_question').serialize(),
        success: function(result){
            window.location.reload();
        }
    });
};
