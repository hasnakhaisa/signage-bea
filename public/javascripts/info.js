// infolist data array for filling in info box
var infoData = [];

// DOM Ready =============================================================
$(document).ready(function () {
    // Populate the info table on initial page load
    $('#btnSaveinfo').on('click', modifyinfo);

    $('#nav-unload').load("nav");

    populateTable();

    $('#infoList table tbody').on('click', 'td button.linkeditinfo', editinfo);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/info/getinfo', function (data) {

        // Stick our user data array into a userlist variable in the global object
        infoData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            tableContent += '<tr>';
            tableContent += '<td>' + this.website + '</td>';
            tableContent += '<td>' + this.telepon + '</td>';
            tableContent += '<td><button href="#addinfo" class="linkeditinfo btn btn-warning" rel="' + this._id + '"><i class="icofont icofont-edit"></button></td>';
            tableContent += '</tr>';
        });
        // Inject the whole content string into our existing HTML table
        $('#infoList table tbody').html(tableContent);

    })
};

function editinfo(event) {
    var jump = $(this).attr('href');
    var new_position = $(jump).offset();

    $('html, body').stop().animate({ scrollTop: new_position.top }, 500);

    event.preventDefault();

    dataID = $(this).attr('rel');

    // jQuery AJAX call for JSON
    $.getJSON('/info/getaninfo/' + $(this).attr('rel'), function (data) {
        // Stick our user data array into a userlist variable in the global object
        $('#websiteField').val(data.website);
        $('#telField').val(data.telepon);

        $('#btnSaveinfo').prop('hidden',false);
    });
}

function modifyinfo(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addinfo input').each(function (index, val) {
        if ($(this).val() === '') {
            errorCount++;
        }
    });

    // Check and make sure errorCount's still at zero
    if (errorCount === 0) {

        // If it is, compile all info info into one object
        var newinfo = {
            'website': $('#addinfo form input#websiteField').val(),
            'telepon': $('#addinfo form input#telField').val()
        };

        $.ajax({
            type: 'POST',
            url: '/info/editinfo/' + dataID,
            data: newinfo,
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
    $('#btnSaveinfo').prop('hidden',true);
    // Clear the form inputs
    $('#addinfo form input').val('');
}
