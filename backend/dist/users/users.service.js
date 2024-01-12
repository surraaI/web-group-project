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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const role_enum_1 = require("../auth/enums/role.enum");
const jwt = require("jsonwebtoken");
const constants_1 = require("../auth/constants");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto, roles) {
        const { name, email, password } = createUserDto;
        const createdUser = new this.userModel({
            name,
            email,
            password,
        });
        if (roles && roles.length) {
            createdUser.roles = roles;
        }
        else {
            createdUser.roles = [role_enum_1.Role.User];
        }
        return createdUser.save();
    }
    async findOne(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async findById(id) {
        return this.userModel.findById(id).exec();
    }
    async deleteUser(id) {
        await this.userModel.findByIdAndDelete(id).exec();
    }
    async deleteAll() {
        await this.userModel.deleteMany().exec();
    }
    async updateUser(id, updateUserDto) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        return this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .exec();
    }
    async createAdmin(createUserDto) {
        const { name, email, password } = createUserDto;
        const createdUser = new this.userModel({
            name,
            email,
            password,
        });
        createdUser.roles = [role_enum_1.Role.Admin];
        return createdUser.save();
    }
    async addHealthRecordToUser(userId, healthRecord) {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.myhealthRecords.push(healthRecord);
        await user.save();
    }
    async getRecordsByUserId(request) {
        const token = this.extractTokenFromRequest(request);
        const userId = this.extractUserIdFromToken(token);
        if (!userId) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        const user = await this.userModel.findById(userId);
        return user.myhealthRecords;
    }
    extractTokenFromRequest(request) {
        const authorizationHeader = request.headers.authorization;
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            return authorizationHeader.substring('Bearer '.length);
        }
        return undefined;
    }
    extractUserIdFromToken(token) {
        try {
            const decodedToken = jwt.verify(token, constants_1.jwtConstants.secret);
            return decodedToken.id;
        }
        catch (error) {
            return undefined;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map