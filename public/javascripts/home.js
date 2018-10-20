let inboxData = [];
let outboxData = [];
let videoList = [];
let videoPlayer;
$(document).ready(function () {
    populateInboxTable();
    populateOutboxTable();
    generateText();
    dateTime();
    basicInfo();
    loadPhotos();
    loadVideos();
});

function populateInboxTable() {
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/inbox/getinbox', function (data) {

        // Stick our user data array into a userlist variable in the global object
        inboxData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            tableContent += '<tr>\n' +
                '                                                    <td style="background: #91c6e8;">\n' +
                '                                                        <div class="task-contain text-white">\n' +
                '                                                            <div class="row">\n' +
                '                                                                <div class="col-md-1"\n' +
                '                                                                     style="background: #c0deef;border-radius: 4px;"></div>\n' +
                '                                                                <div class="col-md-6">\n' +
                '                                                                    <span style="float: left;font-weight: 600;font-size: 14px !important;color: #034879;"\n' +
                '                                                                          class="m-l-10">' + this.sender + '</span>\n' +
                '                                                                    <br>\n' +
                '                                                                    <span style="float: left;color: #325167;"\n' +
                '                                                                          class="m-l-10 m-t-5">' + this.subjek + '</span>\n' +
                '                                                                </div>\n' +
                '                                                                <div class="col-md-5">\n' +
                '                                                                    <span style="color: #325167;float: right;font-weight: 600;font-size: 14px !important;"\n' +
                '                                                                          class="m-l-10">Posisi Surat: ' + this.posisi + '</span>\n' +
                '                                                                    <span style="font-size: 12px !important;float: right !important;color: #325167;"\n' +
                '                                                                          class="m-l-10 m-t-5">' + this.waktu + '</span>\n' +
                '                                                                </div>\n' +
                '                                                            </div>\n' +
                '                                                        </div>\n' +
                '                                                    </td>\n' +
                '                                                </tr>';
        });
        // Inject the whole content string into our existing HTML table
        $('#inboxList table tbody').html(tableContent);

    })
};

function populateOutboxTable() {
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/outbox/getoutbox', function (data) {

        // Stick our user data array into a userlist variable in the global object
        outboxData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            tableContent += '<tr>\n' +
                '                                                    <td style="background: #91c6e8;">\n' +
                '                                                        <div class="task-contain text-white">\n' +
                '                                                            <div class="row">\n' +
                '\n' +
                '                                                                <div class="col-md-6">\n' +
                '                                                                    <span style="float: left;font-weight: 600;font-size: 14px !important;color: #034879;"\n' +
                '                                                                          class="m-l-10">' + this.sender + '</span>\n' +
                '                                                                    <br>\n' +
                '                                                                    <span style="float: left;color: #325167;"\n' +
                '                                                                          class="m-l-10 m-t-5">' + this.subjek + '</span>\n' +
                '                                                                </div>\n' +
                '                                                                <div class="col-md-5">\n' +
                '                                                                    <span style="color: #325167;float: right;font-weight: 600;font-size: 14px !important;"\n' +
                '                                                                          class="m-l-10">Posisi Surat: ' + this.posisi + '</span>\n' +
                '                                                                    <span style="font-size: 12px !important;float: right !important;color: #325167;"\n' +
                '                                                                          class="m-l-10 m-t-5">' + this.waktu + '</span>\n' +
                '                                                                </div>\n' +
                '                                                                <div class="col-md-1"\n' +
                '                                                                     style="background: #c0deef;border-radius: 4px;"></div>\n' +
                '                                                            </div>\n' +
                '                                                        </div>\n' +
                '                                                    </td>\n' +
                '                                                </tr>';
        });
        // console.log(tableContent);
        // Inject the whole content string into our existing HTML table
        $('#outboxList table tbody').html(tableContent);

    })
}

function generateText() {
    var kursText = '';
    var beritaText = '';
    $.getJSON('/text/gettext', function (data) {
        $.each(data, function () {
            kursText += '<strong >' + this.kurs + '</strong>';
            beritaText += '<strong >' + this.running + '</strong>';
        });
        $('#kursText').html(kursText);
        $('#beritaText').html(beritaText);
    });
}

function basicInfo() {
    var websiteText = '';
    var teleponText = '';
    $.getJSON('/info/getinfo', function (data) {
        $.each(data, function () {
            websiteText += '<b>' + this.website + '</b>';
            teleponText += ' | ' + this.telepon;
        });
        $('#websiteField').html(websiteText);
        $('#telField').html(teleponText);
    });
}

function dateTime() {
    var days = moment().locale('id').format('dddd, Do MMMM YYYY');
    var timeText = '<b>' + moment().format('LT') + '</b> | ' + days;

    $('#time').html(timeText);
}

function loadPhotos() {
    var content = '';
    var contentIndicator = '';

    // jQuery AJAX call for JSON
    $.getJSON('/photos/getphotos', function (data) {

        // For each item in our JSON, add a table row and cells to the content string
        var x = 0;
        $.each(data, function () {
            if (x == 0) {
                content += '<div class="carousel-item active">\n';
                contentIndicator += ' <li data-target="#carousel-example-2" data-slide-to="' + x + '" class="active"></li>';
            }
            else {
                contentIndicator += ' <li data-target="#carousel-example-2" data-slide-to="' + x + '"></li>';
                content += '<div class="carousel-item">\n';
            }
            content += '                                                    <div class="view">\n' +
                '                                                        <img class="d-block w-100"\n' +
                '                                                             style="height:42vh !important; width: 100% !important;"\n' +
                '                                                             src="' + this.photo_url + '"\n' +
                '                                                             alt="First slide">\n' +
                '                                                        <div class="mask rgba-black-light"></div>\n' +
                '                                                    </div>\n' +
                '                                                    <div class="carousel-caption">\n' +
                '                                                        <p>' + this.caption + '</p>\n' +
                '                                                    </div>\n' +
                '                                                </div>'
            x++;
        });
        // Inject the whole content string into our existing HTML table
        $('#photoSlider').html(content);
        $('#photoNav').html(contentIndicator);
    })
}

function loadVideos() {
    var content = '';

    // jQuery AJAX call for JSON
    $.getJSON('/videos/getvideos', function (data) {
        x = 0;
        $.each(data, function () {
            if (x == 0) {
                content += '<video id="vidPlayer" controls autoplay onended="run()" class=" d-block w-100"\n' +
                    '                                               style="width: 100% !important; height: 39vh;">\n' +
                    '<source src=' + this.video_url + ' type="video/mp4"></video>';
            }
            videoList.push(this.video_url);
            x++;
        });
        // Inject the whole content string into our existing HTML table
        $('#player').html(content);
    });
}
a = 1;
function run() {
    videoPlayer = document.getElementById("vidPlayer");
    var nextVideo = videoList[a];

    videoPlayer.src = nextVideo;
    videoPlayer.play();
    if (a == videoList.length - 1)
        a = 0;
    else
        a++;
};