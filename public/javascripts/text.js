// textlist data array for filling in info box
var textData = [];

// DOM Ready =============================================================
$(document).ready(function () {
    // Populate the text table on initial page load
    $('#btnSavetext').on('click', modifytext);

    populateTable();

    $('#textList table tbody').on('click', 'td button.linkedittext', edittext);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/text/gettext', function (data) {

        // Stick our user data array into a userlist variable in the global object
        textData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            tableContent += '<tr>';
            tableContent += '<td>' + this.kurs + '</td>';
            tableContent += '<td>' + this.running + '</td>';
            tableContent += '<td><button href="#addtext" class="linkedittext btn btn-warning" rel="' + this._id + '"><i class="icofont icofont-edit"></button></td>';
            tableContent += '</tr>';
        });
        // Inject the whole content string into our existing HTML table
        $('#textList table tbody').html(tableContent);

    })
};

function edittext(event) {
    var jump = $(this).attr('href');
    var new_position = $(jump).offset();

    $('html, body').stop().animate({ scrollTop: new_position.top }, 500);

    event.preventDefault();

    dataID = $(this).attr('rel');

    // jQuery AJAX call for JSON
    $.getJSON('/text/getantext/' + $(this).attr('rel'), function (data) {
        // Stick our user data array into a userlist variable in the global object
        $('#runningField').val(data.running);
        $('#kursField').val(data.kurs);

        $('#btnSavetext').prop('hidden',false);
    });
}

function modifytext(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addtext input').each(function (index, val) {
        if ($(this).val() === '') {
            errorCount++;
        }
    });

    // Check and make sure errorCount's still at zero
    if (errorCount === 0) {

        // If it is, compile all text info into one object
        var newtext = {
            'kurs': $('#addtext form input#kursField').val(),
            'running': $('#addtext form input#runningField').val()
        }

        $.ajax({
            type: 'POST',
            url: '/text/edittext/' + dataID,
            data: newtext,
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

function clearForm() {
    $('#btnSavetext').prop('hidden',true);
    // Clear the form inputs
    $('#addtext form input').val('');
}
