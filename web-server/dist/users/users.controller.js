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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const bcrypt = require('bcrypt');
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        const customer = this.usersService.create(createUserDto);
        if (customer) {
            const hash = bcrypt.hashSync(createUserDto.password, 10);
            customer.password = hash;
            return await this.usersService.save(customer);
        }
        throw new common_1.HttpException('not valid request', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    findAll() {
        return this.usersService.findAll();
    }
    async findbyUsername(body, session) {
        const user = await this.usersService.findUserEmailOrUserName(body);
        if (user && bcrypt.compareSync(body.password, user.password)) {
            session.user = user;
            user.password = bcrypt.hashSync(user.password, 10);
            return user;
        }
        throw new common_1.HttpException(body.username, common_1.HttpStatus.NOT_FOUND);
    }
    logout(session) {
        const name = session.user.name;
        session.user = undefined;
        return `${name} has loged out`;
    }
    returnUser(session) {
        return session.user;
    }
    async sendMail(userAccess) {
        const user = await this.usersService.findUserEmailOrUserName(userAccess);
        if (user) {
            return this.usersService.sendMail({ user: user,
                expireDate: userAccess.expiredate });
        }
        throw new common_1.HttpException(userAccess.username || userAccess.email, common_1.HttpStatus.NOT_FOUND);
    }
    async returnExpirationDate({ userIdentifier, code }) {
        const user = await this.usersService.findUserEmailOrUserName(userIdentifier);
        const expireDate = await this.usersService.confirmUser(user.name, code);
        if (expireDate) {
            return expireDate.expiredPasswordChange;
        }
        throw new common_1.HttpException('no expire date found', common_1.HttpStatus.NOT_FOUND);
    }
    async update(identifier, updateUserDto) {
        let user = await this.usersService.findByEmail(identifier);
        if (!user) {
            user = await this.usersService.findByUsername(identifier);
        }
        if (updateUserDto.password) {
            const expireDate = await this.usersService.getPermissionToChangePassword(identifier);
            if (expireDate) {
                if (new Date(expireDate.expiredPasswordChange) > new Date()) {
                    const hash = bcrypt.hashSync(updateUserDto.password, 10);
                    updateUserDto.password = hash;
                    this.usersService.deleteExpiration(user.name);
                }
            }
            else {
                throw new common_1.HttpException('not allowed to change password', common_1.HttpStatus.FORBIDDEN);
            }
        }
        const newUser = Object.assign(Object.assign({}, user), updateUserDto);
        return this.usersService.update(newUser);
    }
    remove(usernam) {
        return this.usersService.remove(usernam);
    }
};
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findbyUsername", null);
__decorate([
    (0, common_1.Get)('/logout'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('/connected'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "returnUser", null);
__decorate([
    (0, common_1.Post)('/forgotPassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendMail", null);
__decorate([
    (0, common_1.Post)('/confirmUser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "returnExpirationDate", null);
__decorate([
    (0, common_1.Patch)('/update/:identifier'),
    __param(0, (0, common_1.Param)('identifier')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':usernam'),
    __param(0, (0, common_1.Param)('usernam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map