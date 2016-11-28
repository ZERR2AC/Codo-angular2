import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {GlobalVariable} from '../global'
import {AuthenticationService} from "../_services/authentication.service";

declare var $: any;

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent {
  model: any = {};
  isInSignup: boolean = false;

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
    console.log(typeof module.id);
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe((res) => {
          if (res.ret == 0) {
            //successful
            this.router.navigate(['/']);
          } else if (res.ret == 2) {
            // password mismatch
          }
        },
        error => {
          console.log("login error");
        });
  }

  signupSubmit(): void {
    this.authenticationService.signup(this.model.username, this.model.password)
      .subscribe((res)=> {
          if (res.ret == 0) {
            //successful
            this.login();
          } else if (res.ret == 1) {
            // username already exist
            console.log("already exist");
          }
        },
        error => {
          console.log("sign up Submit error");
        });
  }


}
