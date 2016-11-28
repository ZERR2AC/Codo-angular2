"use strict";
var router_1 = require('@angular/router');
var main_component_1 = require("./main.component.ts");
var list_component_1 = require("./list/list.component.ts");
var setting_component_1 = require("./setting/setting.component.ts");
var routes = [
    {
        path: '',
        component: main_component_1.MainComponent,
        children: [
            {
                path: '',
                component: list_component_1.ListComponent
            }, {
                path: 'setting',
                component: setting_component_1.SettingComponent
            }
        ]
    }
];
exports.MainRouting = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=main.routing.js.map
