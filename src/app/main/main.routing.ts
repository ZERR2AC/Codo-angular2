import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from "./main.component";
import {ListComponent} from "./list/list.component";
import {SettingComponent} from "./setting/setting.component";

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: ListComponent
            }, {
                path: 'setting',
                component: SettingComponent
            }
        ]
    }
];


export const MainRouting = RouterModule.forChild(routes);
