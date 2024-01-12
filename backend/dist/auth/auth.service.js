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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const health_records_service_1 = require("../health-records/health-records.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, healthRecordsService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.healthRecordsService = healthRecordsService;
    }
    async signUp(createUserDto) {
        const { name, email, password } = createUserDto;
        const existingUser = await this.usersService.findOne(email);
        if (existingUser) {
            throw new common_1.BadRequestException('Email already exists');
        }
        if (!this.isValidEmail(email)) {
            throw new common_1.BadRequestException('Invalid email format');
        }
        if (!this.isValidPassword(password)) {
            throw new common_1.BadRequestException('Invalid password');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userr = await this.usersService.create({
            ...createUserDto,
            password: hashedPassword,
        });
        const token = this.jwtService.sign({
            id: userr.id,
            roles: userr.roles,
        });
        return { token };
    }
    async signIn(email, password) {
        const userr = await this.usersService.findOne(email);
        if (!userr || !(await bcrypt.compare(password, userr.password))) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const token = this.jwtService.sign({
            id: userr.id,
            roles: userr.roles,
        });
        return { token };
    }
    async deleteUser(id) {
        await this.usersService.deleteUser(id);
    }
    async deleteAllUsers() {
        await this.usersService.deleteAll();
    }
    async updateUser(id, updateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }
    async getHealthRecordsByUserId(request) {
        return this.usersService.getRecordsByUserId(request);
    }
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    isValidPassword(password) {
        return password.length >= 8;
    }
    async findAll() {
        return this.usersService.findAll();
    }
    async createAdmin(createUserDto) {
        const { email, password } = createUserDto;
        const existingUser = await this.usersService.findOne(email);
        if (existingUser) {
            throw new common_1.BadRequestException('Email already exists');
        }
        if (!this.isValidEmail(email)) {
            throw new common_1.BadRequestException('Invalid email format');
        }
        if (!this.isValidPassword(password)) {
            throw new common_1.BadRequestException('Invalid password');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userr = await this.usersService.createAdmin({
            ...createUserDto,
            password: hashedPassword,
        });
        const token = this.jwtService.sign({
            id: userr.id,
            roles: userr.roles,
        });
        return { token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        health_records_service_1.HealthRecordsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map