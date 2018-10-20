let inboxData = [];
let outboxData = [];
let textData = [];

$(document).ready(function () {
    populateInboxTable();
    populateOutboxTable();
    generateText();
    dateTime();
    basicInfo();
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
        console.log(tableContent);
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
        console.log(data);
        $.each(data, function () {
            kursText += '<strong >' + this.kurs + '</strong>';
            beritaText += '<strong >' + this.running + '</strong>';
        });

        console.log(kursText);
        $('#kursText').html(kursText);
        $('#beritaText').html(beritaText);
    });
}
function basicInfo() {
    var websiteText = '';
    var teleponText = '';
    $.getJSON('/info/getinfo', function (data) {
        console.log(data);
        $.each(data, function () {
            websiteText += '<b>' + this.website + '</b>';
            teleponText += ' | '+this.telepon;
        });
        console.log(websiteText);
        $('#websiteField').html(websiteText);
        $('#telField').html(teleponText);
    });
}

function dateTime() {
    var days = moment().locale('id').format('dddd, Do MMMM YYYY');
    var timeText = '<b>'+moment().format('LT')+'</b> | '+days;

    console.log(timeText);
    $('#time').html(timeText);
}