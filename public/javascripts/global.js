// Inboxlist data array for filling in info box
var inboxData = [];

// DOM Ready =============================================================
$(document).ready(function () {

    // Populate the inbox table on initial page load
    populateTable();

    // Add Inbox button click
    $('#btnAddInbox').on('click', addInbox);

    // Delete Inbox link click
    $('#inboxList table tbody').on('click', 'td a.linkdeleteinbox', deleteInbox);

    $('#inboxList table tbody').on('click', 'td a.linkeditinbox', editInbox);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/users/getinbox', function (data) {

        // Stick our user data array into a userlist variable in the global object
        inboxData = data;


        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            tableContent += '<tr>';
            tableContent += '<td>' + this.sender + '</td>';
            tableContent += '<td>' + this.subjek + '</td>';
            tableContent += '<td>' + this.posisi + '</td>';
            tableContent += '<td>' + this.waktu + '</td>';
            tableContent += '<td><a href="#" class="linkeditinbox" rel="' + this._id + '">edit</a></td>';
            tableContent += '<td><a href="#" class="linkdeleteinbox" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        console.log(tableContent);
        // Inject the whole content string into our existing HTML table
        $('#inboxList table tbody').html(tableContent);

    })
};

function editInbox(event) {
    event.preventDefault();

    var content = "";

    // jQuery AJAX call for JSON
    $.getJSON('/users/editinbox/' + $(this).attr('rel'), function (data) {
        // Stick our user data array into a userlist variable in the global object
        console.log(data);
        console.log(data.sender);
        $('#senderField').attr('value',data.sender);
        $('#subjekField').attr('value',data.subjek);
        $('#posisiField').attr('value',data.posisi);
        $('#waktuField').attr('value',data.waktu);
    })

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
            'waktu': $('#addInbox form input#waktuField').val()
        }

        // Use AJAX to post the object to our addinbox service
        $.ajax({
            type: 'POST',
            data: newInbox,
            url: '/users/addinbox',
            dataType: 'JSON'
        }).done(function (response) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addInbox form input').val('');

                // Update the table
                populateTable();

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
            url: '/users/deleteinbox/' + $(this).attr('rel')
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
