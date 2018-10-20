// Inboxlist data array for filling in info box
var inboxData = [];

var dataID = "";

// DOM Ready =============================================================
$(document).ready(function () {
    // Populate the inbox table on initial page load
    $('#btnAddInbox').on('click', addInbox);
    $('#btnSaveInbox').on('click', modifyInbox);

    populateTable();

    // Delete Inbox link click
    $('#inboxList table tbody').on('click', 'td button.linkdeleteinbox', deleteInbox);

    $('#inboxList table tbody').on('click', 'td button.linkeditinbox', editInbox);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/inbox/getinbox', function (data) {

        // Stick our user data array into a userlist variable in the global object
        inboxData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            tableContent += '<tr>';
            tableContent += '<td>' + this.sender + '</td>';
            tableContent += '<td>' + this.subjek + '</td>';
            tableContent += '<td>' + this.posisi + '</td>';
            tableContent += '<td>' + this.waktu + '</td>';
            tableContent += '<td><button href="#addInbox" class="linkeditinbox btn btn-warning" rel="' + this._id + '"><i class="icofont icofont-edit"></button></td>';
            tableContent += '<td><button href="#inboxList" class="linkdeleteinbox btn btn-danger" rel="' + this._id + '"><i class="icofont icofont-trash"></button></td>';
            tableContent += '</tr>';
        });
        console.log(tableContent);
        // Inject the whole content string into our existing HTML table
        $('#inboxList table tbody').html(tableContent);

    })
};

function editInbox(event) {
    var jump = $(this).attr('href');
    var new_position = $(jump).offset();

    $('html, body').stop().animate({ scrollTop: new_position.top }, 500);

    event.preventDefault();

    dataID = $(this).attr('rel');

    // jQuery AJAX call for JSON
    $.getJSON('/inbox/getaninbox/' + $(this).attr('rel'), function (data) {
        // Stick our user data array into a userlist variable in the global object
        console.log(data);
        console.log(data.sender);
        $('#senderField').val(data.sender);
        $('#subjekField').val(data.subjek);
        $('#posisiField').val(data.posisi);
        $('#waktuField').datetimepicker().value(data.waktu);

        $('#btnSaveInbox').prop('hidden',false);
    });
}

function modifyInbox(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addInbox input').each(function (index, val) {
        if ($(this).val() === '') {
            errorCount++;
        }
    });

    // Check and make sure errorCount's still at zero
    if (errorCount === 0) {

        // If it is, compile all inbox info into one object
        var newInbox = {
            'sender': $('#addInbox form input#senderField').val(),
            'subjek': $('#addInbox form input#subjekField').val(),
            'posisi': $('#addInbox form input#posisiField').val(),
            'waktu': $('#waktuField').datetimepicker().value()
        }

        // Use AJAX to post the object to our addinbox service

        console.log("editinbox global " + dataID);
        console.log("editinbox global val" + JSON.stringify(newInbox));

        $.ajax({
            type: 'POST',
            url: '/inbox/editinbox/' + dataID,
            data: newInbox,
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

// Add Inbox
function addInbox(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addInbox input').each(function (index, val) {
        if ($(this).val() === '') {
            errorCount++;
        }
    });

    // Check and make sure errorCount's still at zero
    if (errorCount === 0) {

        // If it is, compile all inbox info into one object
        var newInbox = {
            'sender': $('#addInbox form input#senderField').val(),
            'subjek': $('#addInbox form input#subjekField').val(),
            'posisi': $('#addInbox form input#posisiField').val(),
            // 'waktu': $('#addInbox form input#waktuField').val()
            'waktu': $('#waktuField').datetimepicker().value()
        }

        // Use AJAX to post the object to our addinbox service
        $.ajax({
            type: 'POST',
            data: newInbox,
            url: '/inbox/addinbox',
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

// Delete Inbox
function deleteInbox(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this inbox?');

    // Check and make sure the inbox confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/inbox/deleteinbox/' + $(this).attr('rel')
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
    $('#btnSaveInbox').prop('hidden',true);
    // Clear the form inputs
    $('#addInbox form input').val('');
}
