/**
 * Created by zane on 11/29/16.
 */


/*Fix iOS :hover bug*/
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
