$(document).ready(function() {
    informationPage = new InformationPage();
    $('#addDeleteSizeSubmit').bind('click', function() {
        informationPage.generateNameBlock()
    });
    $('#teamSizeSubmit').bind('click', function() {
        informationPage.generateNameBlock()
    });
});

var InformationPage = function() {
    this.teamSize = 0;
    this.addDeleteSize = 0;
    this.nameBlock = $(".nameBlock");
}

InformationPage.prototype.generateNameBlock = function() {
    this.teamSize = $('#teamSize').val();
    this.addDeleteSize = $('#addDeleteSize').val();
    if (this.teamSize != 0) {
        this.appendHTML(this.teamSize);
        $('#formSubmitButton').show();
    } else {
        this.appendHTML(this.addDeleteSize);
        $('.addDeleteButtons').show();
    }
}

InformationPage.prototype.appendHTML = function(size) {
    this.nameBlock.empty();
    for (var number = 1; number <= size; number++) {
        this.nameBlock.append("<br/>Name of team member " + number + ": <br/>" +
            "<input type=\"text\" name=\"team_member_" + number + "\" id=\"name" + number + "\"/><br/><br/>");
    }
}
