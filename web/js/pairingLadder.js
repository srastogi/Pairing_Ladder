var PairingLadder = function() {
    this.pairingLadderElement = $('.pairingLadder');
    this.ladderSize = parseInt($('#teamSize').text());
    this.emptyRowToBeCloned = this.pairingLadderElement.find('.emptyRowToBeCloned');
    this.emptyCellToBeCloned = this.pairingLadderElement.find('.emptyCellToBeCloned');
};


PairingLadder.prototype.createPairingLadder = function() {
    var totalColumns = this.ladderSize;
    this.pairingLadderElement.find('.clonedElement').remove();
    for (var rowNumber = 0; rowNumber < this.ladderSize; rowNumber++) {
        var clonedRow = this.cloneRow();
        for (var columnNumber = 0; columnNumber < totalColumns; columnNumber++) {
            this.cloneCell(rowNumber, columnNumber, clonedRow);
        }
        totalColumns--;
    }
    this.addNames();
}

PairingLadder.prototype.cloneRow = function () {
    var clonedRow = this.cloneEmptyElement(this.emptyRowToBeCloned);
    clonedRow.removeClass('emptyRowToBeCloned');
    this.pairingLadderElement.append(clonedRow);
    return clonedRow;
}

PairingLadder.prototype.cloneCell = function(rowNumber, columnNumber, clonedRow) {
    var ladderInstance = this;
    var clonedCell = this.cloneEmptyElement(this.emptyCellToBeCloned);
    clonedCell.removeClass('emptyCellToBeCloned');
    clonedCell.attr('id', this.createId((rowNumber), columnNumber));
    clonedCell.bind('mousedown', function(event) {
        ladderInstance.checkForLeftAndRightClick(event, this);
    });
    clonedRow.append(clonedCell);
    clonedCell.append(0);
}

PairingLadder.prototype.addNames = function() {
    var teamMembers = $('#teamMembers').text().split(',');
    for (var idLocator = 0; idLocator < (this.ladderSize - 1); idLocator++) {
        if (idLocator == 0) {
            var id = this.createId((this.ladderSize - 1), 0);
            this.setHtmlForElementWithGivenId(id, teamMembers[0]);
            this.unbindMouseDownEventForGivenId(id);
            var id = this.createId(0, (this.ladderSize - 1));
            this.setHtmlForElementWithGivenId(id, teamMembers[(this.ladderSize - 1)]);
            this.unbindMouseDownEventForGivenId(id);
        } else {
            var id = this.createId(this.ladderSize - (idLocator + 1), idLocator);
            this.setHtmlForElementWithGivenId(id, teamMembers[idLocator]);
            this.unbindMouseDownEventForGivenId(id);
        }
    }
}

PairingLadder.prototype.checkForLeftAndRightClick = function(event, currentSelectedObject) {
    var id = $(currentSelectedObject).attr('id');
    switch (event.which) {
        case 1:
            this.incrementValue(id);
            break;
        case 2:
            this.decrementValue(id);
            $(currentSelectedObject).bind("contextmenu", function(e) {
                return false;
            })
            break;
        default:
            this.decrementValue(id);
            $(currentSelectedObject).bind("contextmenu", function(e) {
                return false;
            })
    }
}

PairingLadder.prototype.incrementValue = function(id) {
    var value = parseInt($('#' + id).html());
    value++;
    $('#' + id).html(value);
}

PairingLadder.prototype.decrementValue = function(id) {
    if (parseInt($('#' + id).html()) <= 0) {
        alert("Value can't be less than 0!");
    } else {
        var value = parseInt($('#' + id).html());
        value--;
        $('#' + id).html(value);

    }
}

PairingLadder.prototype.unbindMouseDownEventForGivenId = function(id) {
    $('#' + id).unbind('mousedown');
}

PairingLadder.prototype.setHtmlForElementWithGivenId = function(id, elementHtml) {
    var regex = /\[|\]/;
    $('#' + id).html(elementHtml.replace(regex, '').trim());
}

PairingLadder.prototype.createId = function(firstHalf, secondHalf) {
    return firstHalf.toString() + secondHalf.toString();
}

PairingLadder.prototype.cloneEmptyElement = function(emptyElementToBeCloned) {
    var clonedElement = $(emptyElementToBeCloned).clone();
    clonedElement.removeClass('noDisplay');
    clonedElement.addClass('clonedElement');
    return $(clonedElement);
}

PairingLadder.prototype.addToLadder = function() {
    resetAddDeleteBlock()
    var addDeleteBlock = $('#addDeleteBlock');
    addDeleteBlock.show();
    $('#formSubmitButton').bind('click', function() {
        addDeleteBlock.hide();
    });
}

PairingLadder.prototype.deleteFromLadder = function() {
    resetAddDeleteBlock()

    $('#formSubmitButton').bind('click', function() {
        addDeleteBlock.hide();
    });
}


PairingLadder.prototype.resetAddDeleteBlock = function() {
    var nameBlock = $(".nameBlock");
    nameBlock.empty();
    $("#formSubmitButton").hide();
    $('#addDeleteSize').val('');

}

$(document).ready(function() {
    pairingLadder = new PairingLadder();
    pairingLadder.createPairingLadder();
});