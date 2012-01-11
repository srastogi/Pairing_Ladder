function createPairingLadder() {
    //   alert("in create ladder");
    //  alert($("#list").text());
    var pairingLadder = $(".pairingLadder");
    var ladderSize = parseInt($("#teamSize").text());
    pairingLadder.find(".clonedElement").remove();
    var emptyRowToBeCloned = pairingLadder.find(".emptyRowToBeCloned");
    var emptyColumnToBeCloned = pairingLadder.find(".emptyColumnToBeCloned");
    var k = ladderSize;
    for (i = 0; i < ladderSize; i++) {
        var clonedRow = cloneEmptyElement(emptyRowToBeCloned);
        clonedRow.removeClass("emptyRowToBeCloned");
        for (j = 1; j <= k; j++) {
            var clonedColumn = cloneEmptyElement(emptyColumnToBeCloned);
            clonedColumn.removeClass("emptyColumnToBeCloned");
            clonedColumn.attr("id", (i + 1).toString() + j.toString());
            k = k - i;
        }
    }
//    $('#list').each(function(index) {
//        alert(index + ': ' + $(this).text());
//    });
}

function cloneEmptyElement(emptyElementToBeCloned) {
    var clonedElement = $(emptyElementToBeCloned).clone();
    clonedElement.removeClass("noDisplay");
    clonedElement.addClass("clonedElement");
    return $(clonedElement);
}

