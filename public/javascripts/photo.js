// Photolist data array for filling in info box
var photoData = [];

var dataID="";

var images;

// DOM Ready =============================================================
$(document).ready(function () {

    // Populate the photo table on initial page load
    populateTable();

    $('#btnAddPhoto').on('click', addPhoto);

    // Delete Photo link click
    $('#photoList table tbody').on('click', 'td a.linkdeletephoto', deletePhoto);

    $('#photoList table tbody').on('click', 'td a.linkeditphoto', editPhoto);

    // Variable to store your files


// Add events
    $('input[type=file]').on('change', prepareUpload);

// Grab the files and set them to our variable
});

function prepareUpload(event)
{
    images = event.target.files;
}

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/photos/getphotos', function (data) {

        // Stick our user data array into a userlist variable in the global object
        photoData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            tableContent += '<tr>';
            tableContent += '<td>' + this.name + '</td>';
            tableContent += '<td>' + this.caption + '</td>';
            tableContent += '<td>' + this.photo_url + '</td>';
            tableContent += '<td><a href="#" class="linkeditphoto" rel="' + this._id + '">edit</a></td>';
            tableContent += '<td><a href="#" class="linkdeletephoto" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        console.log(tableContent);
        // Inject the whole content string into our existing HTML table
        $('#photoList table tbody').html(tableContent);

    })
};

function editPhoto(event) {
    event.preventDefault();

    dataID = $(this).attr('rel');

    // jQuery AJAX call for JSON
    $.getJSON('/photos/getanphoto/' + $(this).attr('rel'), function (data) {
        // Stick our user data array into a userlist variable in the global object
        console.log(data);
        console.log(data.name);
        $('#nameField').val(data.name);
        $('#captionField').val(data.caption);
        $('#photo_urlField').val(data.photo_url);
    });
    $('#btnAddPhoto').on('click', modifyPhoto);
}

function modifyPhoto(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addPhoto input').each(function (index, val) {
        if ($(this).val() === '') {
            errorCount++;
        }
    });

    // Check and make sure errorCount's still at zero
    if (errorCount === 0) {

        // If it is, compile all photo info into one object
        var newPhoto = {
            'name': $('#addPhoto form input#nameField').val(),
            'caption': $('#addPhoto form input#captionField').val(),
            'photo_url': $('#addPhoto form input#photo_urlField').val(),
        }

        // Use AJAX to post the object to our addphoto service

        console.log("editphoto global " + dataID);
        console.log("editphoto global val" + JSON.stringify(newPhoto));

        $.ajax({
            type: 'POST',
            url: '/photos/editphoto/' + dataID,
            data: newPhoto,
            dataType: 'JSON'
        }).done(function (response) {

            // Check for successful (blank) response
            if (response.msg === '') {

                clearForm();
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

}

// Add Photo
function addPhoto(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addPhoto input').each(function (index, val) {
        if ($(this).val() === '') {
            errorCount++;
        }
    });

    // Check and make sure errorCount's still at zero
    if (errorCount === 0) {

        // If it is, compile all photo info into one object
        var newPhoto = {
            'images' :images,
            'name': $('#addPhoto form input#nameField').val(),
            'caption': $('#addPhoto form input#captionField').val(),
            'photo_url': $('#addPhoto form input#fileUpload').val(),
        }

        // Use AJAX to post the object to our addphoto service
        $.ajax({
            type: 'POST',
            data: newPhoto,
            url: '/photos/uploadphoto',
            dataType: 'JSON'
        }).done(function (response) {

            // Check for successful (blank) response
            if (response.msg === '') {
                clearForm();
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

// Delete Photo
function deletePhoto(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this photo?');

    // Check and make sure the photo confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/photos/deletephoto/' + $(this).attr('rel')
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
    dataID = "";
    // Clear the form inputs
    $('#addPhoto form input').val('');
    if (dataID = "")
        $('#btnAddPhoto').on('click', addPhoto);
}
