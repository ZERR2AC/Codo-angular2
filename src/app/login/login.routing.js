"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require("./login.component.ts");
var routes = [
    {
        path: '',
        component: login_component_1.LoginComponent,
        children: []
    }
];
exports.LoginRouting = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=login.routing.js.map
