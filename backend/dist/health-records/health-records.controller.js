"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthRecordsController = void 0;
const common_1 = require("@nestjs/common");
const create_health_record_dto_1 = require("./dto/create-health-record.dto");
const update_health_record_dto_1 = require("./dto/update-health-record.dto");
const health_records_service_1 = require("./health-records.service");
const auth_guard_1 = require("../auth/auth.guard");
let HealthRecordsController = class HealthRecordsController {
    constructor(healthRecordsService) {
        this.healthRecordsService = healthRecordsService;
    }
    createRecord(createHealthRecordDto, request) {
        return this.healthRecordsService.create(createHealthRecordDto, request);
    }
    findAll() {
        return this.healthRecordsService.findAll();
    }
    findOne(id) {
        return this.healthRecordsService.findOne(id);
    }
    update(id, updateHealthRecordDto) {
        return this.healthRecordsService.update(id, updateHealthRecordDto);
    }
    remove(id) {
        return this.healthRecordsService.remove(id);
    }
};
exports.HealthRecordsController = HealthRecordsController;
__decorate([
    (0, common_1.Post)('createRecord'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_health_record_dto_1.CreateHealthRecordDto, Object]),
    __metadata("design:returntype", void 0)
], HealthRecordsController.prototype, "createRecord", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('findall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthRecordsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HealthRecordsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_health_record_dto_1.UpdateHealthRecordDto]),
    __metadata("design:returntype", void 0)
], HealthRecordsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)('remove/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HealthRecordsController.prototype, "remove", null);
exports.HealthRecordsController = HealthRecordsController = __decorate([
    (0, common_1.Controller)('health-records'),
    __metadata("design:paramtypes", [health_records_service_1.HealthRecordsService])
], HealthRecordsController);
//# sourceMappingURL=health-records.controller.js.map