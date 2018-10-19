
let inboxData = [];
let outboxData = [];

$(document).ready(function() {
    populateInboxTable();
    populateOutboxTable();
});

function populateInboxTable() {
    console.log("method ok");
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/inbox/getinbox', function (data) {

        // Stick our user data array into a userlist variable in the global object
        inboxData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            tableContent+= '<tr>\n' +
                '                                                    <td style="background: #91c6e8;">\n' +
                '                                                        <div class="task-contain text-white">\n' +
                '                                                            <div class="row">\n' +
                '                                                                <div class="col-md-1"\n' +
                '                                                                     style="background: #c0deef;border-radius: 4px;"></div>\n' +
                '                                                                <div class="col-md-6">\n' +
                '                                                                    <span style="float: left;font-weight: 600;font-size: 14px !important;color: #034879;"\n' +
                '                                                                          class="m-l-10">'+ this.sender + '</span>\n' +
                '                                                                    <br>\n' +
                '                                                                    <span style="float: left;color: #325167;"\n' +
                '                                                                          class="m-l-10 m-t-5">'+ this.subjek+ '</span>\n' +
                '                                                                </div>\n' +
                '                                                                <div class="col-md-5">\n' +
                '                                                                    <span style="color: #325167;float: right;font-weight: 600;font-size: 14px !important;"\n' +
                '                                                                          class="m-l-10">Posisi Surat: '+ this.posisi+ '</span>\n' +
                '                                                                    <span style="font-size: 12px !important;float: right !important;color: #325167;"\n' +
                '                                                                          class="m-l-10 m-t-5">'+ this.waktu+ '</span>\n' +
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
    console.log("method ok");
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/outbox/getoutbox', function (data) {

        // Stick our user data array into a userlist variable in the global object
        outboxData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            tableContent+= '<tr>\n' +
                '                                                    <td style="background: #91c6e8;">\n' +
                '                                                        <div class="task-contain text-white">\n' +
                '                                                            <div class="row">\n' +
                '\n' +
                '                                                                <div class="col-md-6">\n' +
                '                                                                    <span style="float: left;font-weight: 600;font-size: 14px !important;color: #034879;"\n' +
                '                                                                          class="m-l-10">'+this.sender+'</span>\n' +
                '                                                                    <br>\n' +
                '                                                                    <span style="float: left;color: #325167;"\n' +
                '                                                                          class="m-l-10 m-t-5">'+this.subjek+'</span>\n' +
                '                                                                </div>\n' +
                '                                                                <div class="col-md-5">\n' +
                '                                                                    <span style="color: #325167;float: right;font-weight: 600;font-size: 14px !important;"\n' +
                '                                                                          class="m-l-10">Posisi Surat: '+this.posisi+'</span>\n' +
                '                                                                    <span style="font-size: 12px !important;float: right !important;color: #325167;"\n' +
                '                                                                          class="m-l-10 m-t-5">'+this.waktu+'</span>\n' +
                '                                                                </div>\n' +
                '                                                                <div class="col-md-1"\n' +
                '                                                                     style="background: #c0deef;border-radius: 4px;"></div>\n' +
                '                                                            </div>\n' +
                '                                                        </div>\n' +
                '                                                    </td>\n' +
                '                                                </tr>';
        });
        console.log(tableContent);
        // Inject the whole content string into our existing HTML table
        $('#outboxList table tbody').html(tableContent);

    })
};