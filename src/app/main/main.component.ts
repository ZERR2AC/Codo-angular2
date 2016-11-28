import {Component, ViewChild, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../_services/authentication.service";
import {ModalDialogComponent} from "../modalDialog/modalDialog.component";

@Component({
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.css']
})

export class MainComponent implements OnInit{
    ngOnInit(): void {
        this.checkConnection();
    }

    @ViewChild(ModalDialogComponent)
    public modal: ModalDialogComponent;

    constructor(
        private router: Router,
        private authenticationService:AuthenticationService,
    ){}

    logout():void{
        this.authenticationService.logout();
    }

    checkConnection(){
        this.authenticationService.checkConnection().subscribe(
            res=>res,
            err=>{
                this.modal.showWithContent("Network error!!! please refresh and try it later");
            }
        )
    }


}
