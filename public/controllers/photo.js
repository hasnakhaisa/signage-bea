// Photolist data array for filling in info box
var photoData = [];

var dataID = "";

var image;

var trig = 0;

var photoUrl;

// DOM Ready =============================================================
$(document).ready(function () {

    $('#btnAddphoto').on('click', addPhoto);
    $('#btnSavephoto').on('click', modifyPhoto);

    // Populate the photo table on initial page load
    populateTable();

    // Delete Photo link click
    $('#photoList table tbody').on('click', 'td button.linkdeletephoto', deletePhoto);

    $('#photoList table tbody').on('click', 'td button.linkeditphoto', editPhoto);

    // Variable to store your files


// Add events
    $('input[type=file]').on('change', prepareUpload);

// Grab the files and set them to our variable
});

function prepareUpload(event) {
    image = event.target.files;
    trig = 1;
}

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
            tableContent += '<td><img class="w-50" src="' + this.photo_url + '"></td>';
            tableContent += '<td>' + this.caption + '</td>';
            tableContent += '<td><button href="#addphoto" class="linkeditphoto btn btn-warning" rel="' + this._id + '"><i class="icofont icofont-edit"></button></td>';
            tableContent += '<td><button class="linkdeletephoto btn btn-danger" rel="' + this._id + '"><i class="icofont icofont-trash"></button></td>';
            tableContent += '</tr>';
        });
        // Inject the whole content string into our existing HTML table
        $('#photoList table tbody').html(tableContent);

    })
};

function editPhoto(event) {
    var jump = $(this).attr('href');
    var new_position = $(jump).offset();

    $('html, body').stop().animate({scrollTop: new_position.top}, 500);

    event.preventDefault();

    dataID = $(this).attr('rel');

    // jQuery AJAX call for JSON
    $.getJSON('/photos/getaphoto/' + $(this).attr('rel'), function (data) {
        // Stick our user data array into a userlist variable in the global object

        $('#captionField').val(data.caption);
        // $('input[type=file]').val(data.photo_url);
        photoUrl = data.photo_url;
    });
    $('#btnSavephoto').prop('hidden', false);
}

function modifyPhoto(event) {
    event.stopPropagation();
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank

    // Check and make sure errorCount's still at zero
    if ($('#captionField').val() !== '') {

        var url;
        var imageData;
        var cType = "application/x-www-form-urlencoded; charset=UTF-8";
        var pData = true;

        if (trig == 0) {

            imageData = {
                'caption': $('#addphoto form input#captionField').val()
            };
            url = '/photos/editphoto/' + dataID;
        }
        else {
            imageData = new FormData();
            var caption = $('#addphoto form input#captionField').val();
            imageData.append('caption', caption);
            imageData.append('image', $('input[type=file]')[0].files[0]);
            pData = false;
            cType = false;
            url = '/photos/edituploadphoto/' + dataID;
        }
        $.ajax({
            type: 'POST',
            url: url,
            data: imageData,
            contentType: cType,
            processData: pData,
            dataType: 'JSON',
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                console.log(jqXHR);
            }
        }).done(function (response) {
            // Check for successful (blank) response
            if (response.msg === '') {
                if (url == "/photos/edituploadphoto/" + dataID) {
                    $.ajax({
                        type: 'POST',
                        data:  {'url': photoUrl},
                        dataType: 'JSON',
                        url: '/photos/removephoto/',
                        error: function (jqXHR, exception) {
                            var msg = '';
                            if (jqXHR.status === 0) {
                                msg = 'Not connect.\n Verify Network.';
                            } else if (jqXHR.status == 404) {
                                msg = 'Requested page not found. [404]';
                            } else if (jqXHR.status == 500) {
                                msg = 'Internal Server Error [500].';
                            } else if (exception === 'parsererror') {
                                msg = 'Requested JSON parse failed.';
                            } else if (exception === 'timeout') {
                                msg = 'Time out error.';
                            } else if (exception === 'abort') {
                                msg = 'Ajax request aborted.';
                            } else {
                                msg = 'Uncaught Error.\n' + jqXHR.responseText;
                            }
                            console.log(jqXHR);
                        }
                    }).done(function (response) {

                    });
                }
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
        alert('Mohon isi semua kolom');
        return false;
    }

}

// Add Photo
function addPhoto(event) {
    event.stopPropagation();
    event.preventDefault();

    if ($('#captionField').val() !== '' && trig != 0) {
        // If it is, compile all photo info into one object

        var imageData = new FormData();
        var caption = $('#addphoto form input#captionField').val();

        imageData.append('caption', caption);
        imageData.append('image', $('input[type=file]')[0].files[0]);


        $.ajax({
            type: 'POST',
            data: imageData,
            url: '/photos/uploadphoto',
            contentType: false,
            processData: false,
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                console.log(jqXHR);
            }
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
        alert('Mohon isi semua kolom');
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
        $.getJSON('/photos/getaphoto/' + $(this).attr('rel'), function (data) {
            $.ajax({
                type: 'GET',
                url: '/photos/deletephoto/' + data._id,
                error: function (jqXHR, exception) {
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    console.log(jqXHR);
                }
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

        });
    }

    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};

function clearForm() {
    $('#btnSavephoto').prop('hidden', true);
    // Clear the form inputs
    $('#addphoto form input').val('');
    trig = 0;
}
