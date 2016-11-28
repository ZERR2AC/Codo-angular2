import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login.component";

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        children: [
        ]
    }
];


export const LoginRouting = RouterModule.forChild(routes);