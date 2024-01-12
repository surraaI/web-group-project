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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthRecordSchema = exports.HealthRecord = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
let HealthRecord = class HealthRecord extends mongoose_2.Document {
};
exports.HealthRecord = HealthRecord;
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HealthRecord.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], HealthRecord.prototype, "caloriesAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HealthRecord.prototype, "foodType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], HealthRecord.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], HealthRecord.prototype, "height", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], HealthRecord.prototype, "minutesOfExercise", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], HealthRecord.prototype, "amountOfWaterTaken", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], HealthRecord.prototype, "date", void 0);
exports.HealthRecord = HealthRecord = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], HealthRecord);
exports.HealthRecordSchema = mongoose_1.SchemaFactory.createForClass(HealthRecord);
//# sourceMappingURL=healthRecord.schema.js.map