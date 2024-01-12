"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthRecordsModule = void 0;
const common_1 = require("@nestjs/common");
const health_records_controller_1 = require("./health-records.controller");
const healthRecord_schema_1 = require("./schemas/healthRecord.schema");
const mongoose_1 = require("@nestjs/mongoose");
const users_service_1 = require("../users/users.service");
const user_schema_1 = require("../users/schemas/user.schema");
const users_module_1 = require("../users/users.module");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("../auth/roles.guard");
const health_records_service_1 = require("./health-records.service");
let HealthRecordsModule = class HealthRecordsModule {
};
exports.HealthRecordsModule = HealthRecordsModule;
exports.HealthRecordsModule = HealthRecordsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: healthRecord_schema_1.HealthRecord.name, schema: healthRecord_schema_1.HealthRecordSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.userSchema },
            ]),
            users_module_1.UsersModule,
        ],
        controllers: [health_records_controller_1.HealthRecordsController],
        providers: [
            health_records_service_1.HealthRecordsService,
            users_service_1.UsersService,
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
        exports: [health_records_service_1.HealthRecordsService],
    })
], HealthRecordsModule);
//# sourceMappingURL=health-records.module.js.map