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
