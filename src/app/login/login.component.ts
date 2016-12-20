import {Component, AfterViewInit} from "@angular/core";
import {Router} from "@angular/router";
import {GlobalVariable} from '../global'
import {AuthenticationService} from "../_services/authentication.service";

declare var $: any;

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements AfterViewInit {
    ngAfterViewInit(): void {

        // for background video
        //jQuery is required to run this code
        $(document).ready(function () {
            scaleVideoContainer();

            initBannerVideoSize('.video-container .poster img');
            initBannerVideoSize('.video-container video');

            $(window).on('resize', function () {
                scaleVideoContainer();
                scaleBannerVideoSize('.video-container .poster img');
                scaleBannerVideoSize('.video-container video');
            });

        });

        function scaleVideoContainer() {

            var height = $(window).height();
            var unitHeight = parseInt(height) + 'px';
            $('.video-container').css('height', unitHeight);

        }

        function initBannerVideoSize(element) {

            $(element).each(function () {
                $(this).data('height', $(this).height());
                $(this).data('width', $(this).width());
            });

            scaleBannerVideoSize(element);

        }

        function scaleBannerVideoSize(element) {

            var windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                videoWidth,
                videoHeight;

            $(element).each(function () {
                // var videoAspectRatio = $(this).data('height')/$(this).data('width');
                var videoAspectRatio = 0.5625;
                $(this).removeAttr("style").width(windowWidth);
                var showVideoHeight = windowWidth * videoAspectRatio;
                var showVideoWidth = -1;

                if (showVideoHeight < windowHeight) {
                    $(this).removeAttr("style").height(windowHeight);
                    showVideoWidth = windowHeight / videoAspectRatio;
                }

                if (windowWidth > 2000) {
                    $(this).removeAttr("style").width(windowWidth);
                    showVideoWidth = windowWidth
                }

                if (showVideoWidth > windowWidth) {
                    var left = ((windowWidth - showVideoWidth) / 2.0).toString() + 'px';
                    $(this).css('left', left);
                }


                $('.video-container video').addClass('fadeIn animated');

            });
        }

    }

    model: any = {};
    isInSignup: boolean = false;
    userNameUsedError: boolean = false;
    userNamePasswordMismatchError: boolean = false;

    constructor(private router: Router,
                private authenticationService: AuthenticationService) {
    }

    loginButtonDidClick(): void {
        this.login();
    }

    signToggleDidClick(): void {
        this.isInSignup = !this.isInSignup;
        $(".animate-container").animateCss("animated bounceIn");
    }

    login(): void {
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe((res) => {
                    if (res.ret == 0) {
                        //successful
                        $('.login-component-container').addClass('fadeOut animated');
                        setTimeout(()=> {
                            this.router.navigate(['/']);
                        }, 300)

                    } else if (res.ret == 2) {
                        // password mismatch
                        this.userNamePasswordMismatchError = true;
                    }
                },
                error => {
                    console.log("login error");
                });
    }

    signupSubmit(): void {
        this.authenticationService.signup(this.model.username, this.model.password)
            .subscribe((res)=> {
                    console.log("submit");
                    if (res.ret == 0) {
                        //successful
                        this.login();
                    } else if (res.ret == 1) {
                        // username already exist
                        console.log("already exist");
                        this.userNameUsedError = true;
                    }
                },
                error => {
                    console.log("sign up Submit error");
                });
    }

    resetError(){
        this.userNameUsedError = false;
        this.userNamePasswordMismatchError = false;
    }

}
