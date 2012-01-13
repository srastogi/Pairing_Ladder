function generateNameBlock() {
    var nameBlock = $(".nameBlock");
    nameBlock.empty();
    var teamSize = $("#teamSize").val();
    for (var number = 1; number <= teamSize; number++) {
        nameBlock.append("<br/>Name of team member " + number + ": <br/>" +
            "<input type=\"text\" name=\"team_member_" + number + "\"><br/><br/>");
    }
    $("#formSubmitButton").show();
}
