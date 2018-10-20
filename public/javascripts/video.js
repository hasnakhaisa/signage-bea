// videolist data array for filling in info box
var videoData = [];

var dataID = "";

var video;

var trig = 0;

var photoUrl;

// DOM Ready =============================================================
$(document).ready(function () {

    $('#btnAddvideo').on('click', addvideo);
    $('#btnSavevideo').on('click', modifyvideo);

    // Populate the video table on initial page load
    populateTable();

    // Delete video link click
    $('#videoList table tbody').on('click', 'td button.linkdeletevideo', deletevideo);

    $('#videoList table tbody').on('click', 'td button.linkeditvideo', editvideo);

    // Variable to store your files


// Add events
    $('input[type=file]').on('change', prepareUpload);

// Grab the files and set them to our variable
});

function prepareUpload(event) {
    video = event.target.files;
    trig = 1;
}

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/videos/getvideos', function (data) {

        // Stick our user data array into a userlist variable in the global object
        videoData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            tableContent += '<tr>';
            tableContent += '<td><video id="player" controls class="d-block w-50"\n' +
                '                                            <source src="' + this.video_url + '" type="video/mp4">\n' +
                '                                        </video></td>';
            tableContent += '<td><button href="#addvideo" class="linkeditvideo btn btn-warning" rel="' + this._id + '"><i class="icofont icofont-edit"></button></td>';
            tableContent += '<td><button class="linkdeletevideo btn btn-danger" rel="' + this._id + '"><i class="icofont icofont-trash"></button></td>';
            tableContent += '</tr>';
        });
        // Inject the whole content string into our existing HTML table
        $('#videoList table tbody').html(tableContent);

    })
};

function editvideo(event) {
    var jump = $(this).attr('href');
    var new_position = $(jump).offset();

    $('html, body').stop().animate({ scrollTop: new_position.top }, 500);

    event.preventDefault();

    dataID = $(this).attr('rel');

    // jQuery AJAX call for JSON
    $.getJSON('/videos/getavideo/' + $(this).attr('rel'), function (data) {
        // Stick our user data array into a userlist variable in the global object
        videoUrl = data.video_url;
    });
    $('#btnSavevideo').prop('hidden', false);
}

function modifyvideo(event) {
    event.stopPropagation();
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank

    // Check and make sure errorCount's still at zero
    if (trig != 0) {

        var url;
        var videoData;
        var cType = "application/x-www-form-urlencoded; charset=UTF-8";
        var pData = true;

        videoData = new FormData();
        videoData.append('video', $('input[type=file]')[0].files[0]);
        pData = false;
        cType = false;
        url = '/videos/edituploadvideo/' + dataID;
        

        $.ajax({
            type: 'POST',
            url: url,
            data: videoData,
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
                $.ajax({
                    type: 'POST',
                    data:  {'url': videoUrl},
                    dataType: 'JSON',
                    url: '/videos/removevideo/',
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

// Add video
function addvideo(event) {
    event.stopPropagation();
    event.preventDefault();
    if (trig != 0) {
        // If it is, compile all video info into one object

        var videoData = new FormData();

        videoData.append('video', $('input[type=file]')[0].files[0]);


        $.ajax({
            type: 'POST',
            data: videoData,
            url: '/videos/uploadvideo',
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


// Delete video
function deletevideo(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this video?');

    // Check and make sure the video confirmed
    if (confirmation === true) {
        $.getJSON('/videos/getavideo/' + $(this).attr('rel'), function (data) {
            $.ajax({
                type: 'GET',
                url: '/videos/deletevideo/' + data._id,
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
    $('#btnSavevideo').prop('hidden', true);
    // Clear the form inputs
    $('#addvideo form input').val('');
    trig = 0;
}
