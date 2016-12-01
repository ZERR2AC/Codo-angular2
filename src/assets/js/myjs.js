/**
 * Created by zane on 11/29/16.
 */


/*Fix iOS :hover bug*/
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}

$('html').click(function () {
    var collapseContainer = $('.collapse-contrainer');
    console.log(collapseContainer);
    if (collapseContainer.css('display') != 'none') {
        collapseContainer.slideUp(300);
    }
});
