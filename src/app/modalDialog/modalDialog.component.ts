import {Component} from "@angular/core";

@Component({
    selector: 'modalDialog',
    templateUrl: 'modalDialog.component.html',
    styleUrls: ['modalDialog.component.css']
})

export class ModalDialogComponent {

    public visible = false;
    private content:string = "";

    public show(): void {
        this.visible = true;
    }

    public showWithContent(content:string){
        this.content = content;
        this.show();
    }

    public hide(): void {
        setTimeout(() => this.visible = false, 300);
    }
}
