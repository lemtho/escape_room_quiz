//ajax function to delete quiz and reload page
function deleteQuiz(id){
    $.ajax({
        url: '/teacherQuiz/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};