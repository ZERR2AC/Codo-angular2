/**
 * Created by zane on 11/29/16.
 */


/*Fix iOS :hover bug*/
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}

$('html').click(function (e) {
    var channelSelect = $('#create-reminder-channel-select');
    var needCollapse = e.originalEvent.path.indexOf(channelSelect[0])==-1;
    if (needCollapse) {
        var collapseContainer = $('.create-reminder-collapse');
        if (collapseContainer.css('display') != 'none') {
            collapseContainer.slideUp(300);
            collapseContainer.addClass('collapse-hide');
        }
    }

});
