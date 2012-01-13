function createPairingLadder() {
    var pairingLadder = $(".pairingLadder");
    var ladderSize = parseInt($("#teamSize").text());
    var emptyRowToBeCloned = pairingLadder.find(".emptyRowToBeCloned");
    var emptyColumnToBeCloned = pairingLadder.find(".emptyColumnToBeCloned");
    var totalColumns = ladderSize;
    pairingLadder.find(".clonedElement").remove();
    for (var rowNumber = 0; rowNumber < ladderSize; rowNumber++) {
        var clonedRow = cloneEmptyElement(emptyRowToBeCloned);
        clonedRow.removeClass("emptyRowToBeCloned");
        pairingLadder.append(clonedRow);
        for (var columnNumber = 0; columnNumber < totalColumns; columnNumber++) {
            var clonedColumn = cloneEmptyElement(emptyColumnToBeCloned);
            clonedColumn.removeClass("emptyColumnToBeCloned");
            clonedColumn.attr("id", createId((rowNumber), columnNumber));
            clonedRow.append(clonedColumn);
            clonedColumn.append(0);
        }
        totalColumns--;
    }
    populateLadderWithNames(ladderSize);
}

function populateLadderWithNames(ladderSize) {
    var teamMembers = $('#teamMembers').text().split(",");
    for (var idLocator = 0; idLocator < (ladderSize - 1); idLocator++) {
        if (idLocator == 0) {
            var id = createId((ladderSize - 1), 0);
            setHtmlForElementWithGivenId(id, teamMembers, 0);
            var id = createId(0, (ladderSize - 1));
            setHtmlForElementWithGivenId(id, teamMembers, (ladderSize - 1));
        } else {
            var id = createId(ladderSize - (idLocator + 1), idLocator);
            setHtmlForElementWithGivenId(id, teamMembers, idLocator);
        }
    }
}

function setHtmlForElementWithGivenId(id, teamMembers, idLocator) {
    var regex = /\[|\]/;
    $("#" + id).html(teamMembers[idLocator].replace(regex, '').trim());
}

function createId(firstHalf, secondHalf) {
    return firstHalf.toString() + secondHalf.toString();
}

function cloneEmptyElement(emptyElementToBeCloned) {
    var clonedElement = $(emptyElementToBeCloned).clone();
    clonedElement.removeClass("noDisplay");
    clonedElement.addClass("clonedElement");
    return $(clonedElement);
}

