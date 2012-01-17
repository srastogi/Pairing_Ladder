function generateNameBlock() {
    var teamSize = 0;
    var addDeleteSize = 0;
    teamSize = $('#teamSize').val();
    addDeleteSize = $('#addDeleteSize').val();
    if (teamSize != 0) {
        appendHTML(teamSize);
        $('#formSubmitButton').show();
    } else {
        appendHTML(addDeleteSize);
        $('.addDeleteButtons').show();
    }
}

function appendHTML(size) {
    var nameBlock = $(".nameBlock");
    nameBlock.empty();
    for (var number = 1; number <= size; number++) {
        nameBlock.append("<br/>Name of team member " + number + ": <br/>" +
            "<input type=\"text\" name=\"team_member_" + number + "\" id=\"name" + number + "\"/><br/><br/>");
    }
}
