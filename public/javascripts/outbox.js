// outboxlist data array for filling in info box
var outboxData = [];

var dataID = "";
var trig = 0;

// DOM Ready =============================================================
$(document).ready(function () {
    // Populate the outbox table on initial page load
    $('#btnAddoutbox').on('click', addoutbox);
    $('#btnSaveoutbox').on('click', modifyoutbox);

    populateTable();

    // Delete outbox link click
    $('#outboxList table tbody').on('click', 'td button.linkdeleteoutbox', deleteoutbox);

    $('#outboxList table tbody').on('click', 'td button.linkeditoutbox', editoutbox);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/outbox/getoutbox', function (data) {

        // Stick our user data array into a userlist variable in the global object
        outboxData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            tableContent += '<tr>';
            tableContent += '<td>' + this.sender + '</td>';
            tableContent += '<td>' + this.subjek + '</td>';
            tableContent += '<td>' + this.posisi + '</td>';
            tableContent += '<td>' + this.waktu + '</td>';
            tableContent += '<td><button href="#addoutbox" class="linkeditoutbox btn btn-warning" rel="' + this._id + '"><i class="icofont icofont-edit"></button></td>';
            tableContent += '<td><button href="#outboxList" class="linkdeleteoutbox btn btn-danger" rel="' + this._id + '"><i class="icofont icofont-trash"></button></td>';
            tableContent += '</tr>';
        });
        // Inject the whole content string into our existing HTML table
        $('#outboxList table tbody').html(tableContent);

    })
};

function editoutbox(event) {
    var jump = $(this).attr('href');
    var new_position = $(jump).offset();

    $('html, body').stop().animate({ scrollTop: new_position.top }, 500);

    event.preventDefault();

    dataID = $(this).attr('rel');

    // jQuery AJAX call for JSON
    $.getJSON('/outbox/getanoutbox/' + $(this).attr('rel'), function (data) {
        $('#senderField').val(data.sender);
        $('#subjekField').val(data.subjek);
        $('#posisiField').val(data.posisi);
        $('#waktuField').datetimepicker().value(data.waktu);

        $('#btnSaveoutbox').prop('hidden',false);
    });
}

function modifyoutbox(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addoutbox input').each(function (index, val) {
        if ($(this).val() === '') {
            errorCount++;
        }
    });

    // Check and make sure errorCount's still at zero
    if (errorCount === 0) {

        // If it is, compile all outbox info into one object
        var newoutbox = {
            'sender': $('#addoutbox form input#senderField').val(),
            'subjek': $('#addoutbox form input#subjekField').val(),
            'posisi': $('#addoutbox form input#posisiField').val(),
            'waktu': $('#waktuField').datetimepicker().value()
        };

        $.ajax({
            type: 'POST',
            url: '/outbox/editoutbox/' + dataID,
            data: newoutbox,
            dataType: 'JSON'
        }).done(function (response) {

            // Check for successful (blank) response
            if (response.msg === '') {
                // Update the table
                populateTable();
                clearForm();
            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }

}

// Add outbox
function addoutbox(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addoutbox input').each(function (index, val) {
        if ($(this).val() === '') {
            errorCount++;
        }
    });

    // Check and make sure errorCount's still at zero
    if (errorCount === 0) {

        // If it is, compile all outbox info into one object
        var newoutbox = {
            'sender': $('#addoutbox form input#senderField').val(),
            'subjek': $('#addoutbox form input#subjekField').val(),
            'posisi': $('#addoutbox form input#posisiField').val(),
            // 'waktu': $('#addoutbox form input#waktuField').val()
            'waktu': $('#waktuField').datetimepicker().value()
        }

        // Use AJAX to post the object to our addoutbox service
        $.ajax({
            type: 'POST',
            data: newoutbox,
            url: '/outbox/addoutbox',
            dataType: 'JSON'
        }).done(function (response) {

            // Check for successful (blank) response
            if (response.msg === '') {
                populateTable();
                clearForm();
            }
            else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }

};

// Delete outbox
function deleteoutbox(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this outbox?');

    // Check and make sure the outbox confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/outbox/deleteoutbox/' + $(this).attr('rel')
        }).done(function (response) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};

function clearForm() {
    $('#btnSaveoutbox').prop('hidden',true);
    // Clear the form inputs
    $('#addoutbox form input').val('');
}
