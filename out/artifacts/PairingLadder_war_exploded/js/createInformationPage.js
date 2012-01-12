
function generateNameBlock() {
    var nameBlock = $(".nameBlock");
    nameBlock.empty();
    var value = $("#teamSize").val();
    for (i = 1; i <= value; i++) {
        nameBlock.append("<br/>Name of team member " + i + ": <br/>" +
            "<input type=\"text\" name=\"team_member_" + i + "\"><br/><br/>");
    }
    $("#formSubmitButton").show();
}
