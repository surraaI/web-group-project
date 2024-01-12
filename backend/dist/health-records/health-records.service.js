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
exports.HealthRecordsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const healthRecord_schema_1 = require("./schemas/healthRecord.schema");
const jwt = require("jsonwebtoken");
const user_schema_1 = require("../users/schemas/user.schema");
const constants_1 = require("../auth/constants");
const users_service_1 = require("../users/users.service");
let HealthRecordsService = class HealthRecordsService {
    constructor(healthRecordModel, userModel, usersService) {
        this.healthRecordModel = healthRecordModel;
        this.userModel = userModel;
        this.usersService = usersService;
    }
    async create(createHealthRecordDto, request) {
        const token = this.extractTokenFromHeader(request);
        const userId = this.extractIdFromToken(token);
        const createdRecord = new this.healthRecordModel(createHealthRecordDto);
        const savedRecord = await createdRecord.save();
        await this.usersService.addHealthRecordToUser(userId, savedRecord);
        return savedRecord;
    }
    extractTokenFromHeader(request) {
        const authorizationHeader = request.headers.authorization;
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            return authorizationHeader.substring('Bearer '.length);
        }
        return undefined;
    }
    extractIdFromToken(token) {
        try {
            const decodedToken = jwt.verify(token, constants_1.jwtConstants.secret);
            return decodedToken.id;
        }
        catch (error) {
            return undefined;
        }
    }
    async findAll() {
        return this.healthRecordModel.find().exec();
    }
    async findOne(id) {
        return this.healthRecordModel.findById(id).exec();
    }
    async update(id, updateHealthRecordDto, request) {
        const token = this.extractTokenFromHeader(request);
        const userId = this.extractIdFromToken(token);
        const updatedRecord = await this.healthRecordModel
            .findByIdAndUpdate(id, updateHealthRecordDto, { new: true })
            .exec();
        const user = await this.userModel.findById(userId).exec();
        if (user) {
            const index = user.myhealthRecords.findIndex(record => record.id === id);
            if (index !== -1) {
                user.myhealthRecords[index] = updatedRecord;
                await user.save();
            }
        }
        return updatedRecord;
    }
    async getRecordsByUserId(userId) {
        const user = this.userModel.findById(userId).exec();
        return (await user).myhealthRecords;
    }
    async remove(id, request) {
        const token = this.extractTokenFromHeader(request);
        const userId = this.extractIdFromToken(token);
        const deletedRecord = await this.healthRecordModel.findOneAndDelete({ _id: id }).exec();
        const user = await this.userModel.findById(userId).exec();
        if (user) {
            const index = user.myhealthRecords.findIndex(record => record.id === id);
            if (index !== -1) {
                user.myhealthRecords.splice(index, 1);
                await user.save();
            }
        }
        return deletedRecord;
    }
};
exports.HealthRecordsService = HealthRecordsService;
exports.HealthRecordsService = HealthRecordsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(healthRecord_schema_1.HealthRecord.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        users_service_1.UsersService])
], HealthRecordsService);
//# sourceMappingURL=health-records.service.js.map