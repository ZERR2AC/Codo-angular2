import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./_guards/auth.guard";


const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: 'app/main/main.module#MainModule'
    },
    {
        path: 'login',
        loadChildren: 'app/login/login.module#LoginModule',
    },
    {
        path: '**',
        redirectTo: ''
    }
    // {
    //   path: '',
    //   loadChildren: 'app/login/login.module#LoginModule',
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
