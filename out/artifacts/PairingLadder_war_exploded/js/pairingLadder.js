$(document).ready(function() {
    pairingLadder = new PairingLadder();
    pairingLadder.createPairingLadder();

    $('#editButton').bind('click', function() {
        pairingLadder.resetAddDeleteBlock();
    });

    $('#addButton').bind('click', function() {
        pairingLadder.addToLadder();
    });

    $('#deleteButton').bind('click', function() {
        pairingLadder.deleteFromLadder();
    });
});


var PairingLadder = function() {
    this.pairingLadderElement = $('.pairingLadder');
    this.ladderSize = parseInt($('#teamSize').text());
    this.emptyRowToBeCloned = this.pairingLadderElement.find('.emptyRowToBeCloned');
    this.emptyCellToBeCloned = this.pairingLadderElement.find('.emptyCellToBeCloned');
    this.addDeleteBlock = $('#addDeleteBlock');
    this.nameBlock = $(".nameBlock");
    this.addDeleteSizeElement = $('#addDeleteSize');
};

PairingLadder.prototype.createPairingLadder = function() {
    var totalColumns = this.ladderSize;
    this.pairingLadderElement.find('.clonedElement').remove();
    for (var rowNumber = 0; rowNumber < this.ladderSize; rowNumber++) {
        var clonedRow = this.cloneRow("append", rowNumber);
        for (var columnNumber = 0; columnNumber < totalColumns; columnNumber++) {
            this.cloneCell(rowNumber, columnNumber, clonedRow);
        }
        totalColumns--;
    }
    this.addNames();
}

PairingLadder.prototype.cloneRow = function (position, rowNumber) {
    if (position == "append") {
        var clonedRow = this.cloneEmptyElement(this.emptyRowToBeCloned);
        clonedRow.removeClass('emptyRowToBeCloned');
        clonedRow.attr('id', rowNumber.toString());
        this.pairingLadderElement.append(clonedRow);
        return clonedRow;
    }
    else {
        var clonedRow = this.cloneEmptyElement(this.emptyRowToBeCloned);
        clonedRow.removeClass('emptyRowToBeCloned');
        clonedRow.attr('id', rowNumber.toString());
        this.pairingLadderElement.prepend(clonedRow);
        return clonedRow;
    }

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
            });
            break;
        default:
            this.decrementValue(id);
            $(currentSelectedObject).bind("contextmenu", function(e) {
                return false;
            });
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
    var addDeleteSize = parseInt(this.addDeleteSizeElement.val());
    var oldLadderSize = this.ladderSize;
    var nameId = 1;
    this.ladderSize = this.ladderSize + addDeleteSize;
    for (oldLadderSize; oldLadderSize < this.ladderSize; oldLadderSize++) {
        var clonedRow = this.cloneRow("prepend", oldLadderSize);
        for (var columnNumber = 0; columnNumber <= oldLadderSize; columnNumber++) {
            this.cloneCell(oldLadderSize, columnNumber, clonedRow);

        }
        var cellId = this.createId(oldLadderSize, oldLadderSize);
        var textId = "name" + (nameId).toString();
        $('#' + cellId).html($('#' + textId).val());
        this.unbindMouseDownEventForGivenId(cellId);
        nameId++;
    }
    this.refreshIds();
    this.addDeleteBlock.hide();
}

PairingLadder.prototype.deleteFromLadder = function() {
    var addDeleteSize = parseInt(this.addDeleteSizeElement.val());
    for (var num = 1; num <= addDeleteSize; num++) {
        var value = $('#name' + num.toString()).val();
        var id = parseInt($("td:contains('" + value + "')").attr('id'));
        var row = id / 10;
        if (row < 1) {
            row = 0
        } else(row = Math.floor(row));
        var col = id % 10;
        $('#' + row.toString()).remove();
        for (var rowNumber = 0; rowNumber < this.ladderSize; rowNumber++) {
            var idForColumns = '#' + rowNumber.toString() + col.toString();
            $(idForColumns).remove();
        }
    }
    this.refreshIds();
    this.addDeleteBlock.hide();
    this.ladderSize = this.ladderSize - addDeleteSize;
}

PairingLadder.prototype.resetAddDeleteBlock = function() {
    this.addDeleteBlock.show();
    this.nameBlock.empty();
    $('.addDeleteButtons').hide();
    this.addDeleteSizeElement.val('');
}

PairingLadder.prototype.refreshIds = function() {
    var ladderInstance = this;
    $('.pairingLadder tr').each(function(rowNumber) {
        if ($(this).attr('id') != undefined) {
            $(this).attr('id', rowNumber);
        }
        $(this).find('td').each(function(columnNumber) {
            if ($(this).attr('id') != undefined) {
                var id = ladderInstance.createId(rowNumber, columnNumber);
                $(this).attr('id', id);
            }
        });
    });
}
