function createPairingLadder() {
    var pairingLadder = $('.pairingLadder');
    var ladderSize = parseInt($('#teamSize').text());
    var emptyRowToBeCloned = pairingLadder.find('.emptyRowToBeCloned');
    var emptyCellToBeCloned = pairingLadder.find('.emptyCellToBeCloned');
    var totalColumns = ladderSize;
    pairingLadder.find('.clonedElement').remove();
    for (var rowNumber = 0; rowNumber < ladderSize; rowNumber++) {
        var clonedRow = cloneRow(emptyRowToBeCloned, pairingLadder);
        for (var columnNumber = 0; columnNumber < totalColumns; columnNumber++) {
            cloneCell(emptyCellToBeCloned, rowNumber, columnNumber, clonedRow);
        }
        totalColumns--;
    }
    addNames(ladderSize);
}

function cloneRow(emptyRowToBeCloned, pairingLadder) {
    var clonedRow = cloneEmptyElement(emptyRowToBeCloned);
    clonedRow.removeClass('emptyRowToBeCloned');
    pairingLadder.append(clonedRow);
    return clonedRow;
}

function cloneCell(emptyCellToBeCloned, rowNumber, columnNumber, clonedRow) {
    var clonedCell = cloneEmptyElement(emptyCellToBeCloned);
    clonedCell.removeClass('emptyCellToBeCloned');
    clonedCell.attr('id', createId((rowNumber), columnNumber));
    clonedCell.bind('mousedown', function(event) {
        checkForLeftAndRightClick(event, $(this).attr('id'));
    });
    clonedRow.append(clonedCell);
    clonedCell.append(0);
}

function addNames(ladderSize) {
    var teamMembers = $('#teamMembers').text().split(',');
    for (var idLocator = 0; idLocator < (ladderSize - 1); idLocator++) {
        if (idLocator == 0) {
            var id = createId((ladderSize - 1), 0);
            setHtmlForElementWithGivenId(id, teamMembers[0]);
            unbindMouseDownEventForGivenId(id);
            var id = createId(0, (ladderSize - 1));
            setHtmlForElementWithGivenId(id, teamMembers[(ladderSize - 1)]);
            unbindMouseDownEventForGivenId(id);
        } else {
            var id = createId(ladderSize - (idLocator + 1), idLocator);
            setHtmlForElementWithGivenId(id, teamMembers[idLocator]);
            unbindMouseDownEventForGivenId(id);
        }
    }
}

function checkForLeftAndRightClick(event, id) {
    switch (event.which) {
        case 1:
            incrementValue(id);
            break;
        case 2:
            decrementValue(id);
            $(this).bind("contextmenu", function(e) {
                return false;
            })
            break;
        default:
            decrementValue(id);
            $(this).bind("contextmenu", function(e) {
                return false;
            })
    }
}

function incrementValue(id) {
    var value = parseInt($('#' + id).html());
    value++;
    $('#' + id).html(value);
}

function decrementValue(id) {
    if (parseInt($('#' + id).html()) <= 0) {
        alert("Value can't be less than 0!");
    } else {
        var value = parseInt($('#' + id).html());
        value--;
        $('#' + id).html(value);

    }
}

function unbindMouseDownEventForGivenId(id) {
    $('#' + id).unbind('mousedown');
}

function setHtmlForElementWithGivenId(id, elementHtml) {
    var regex = /\[|\]/;
    $('#' + id).html(elementHtml.replace(regex, '').trim());
}

function createId(firstHalf, secondHalf) {
    return firstHalf.toString() + secondHalf.toString();
}

function cloneEmptyElement(emptyElementToBeCloned) {
    var clonedElement = $(emptyElementToBeCloned).clone();
    clonedElement.removeClass('noDisplay');
    clonedElement.addClass('clonedElement');
    return $(clonedElement);
}

function addToLadder() {

}

function deleteFromLadder() {

}

