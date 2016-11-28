/**
 * Created by zane on 11/23/16.
 */


import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./_services/authentication.service";
declare var $: any;

@Component(
    {
        selector: 'app-root',
        template: `<router-outlet></router-outlet>`
    }
)

export class AppComponent implements OnInit {
    ngOnInit(): void {
        //init jQuery
        $.fn.extend({
            animateCss: function (animationName) {
                var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                this.addClass('animated ' + animationName).one(animationEnd, function () {
                    $(this).removeClass('animated ' + animationName);
                });
            }
        });

    }

}

