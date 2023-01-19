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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const changePassword_repository_1 = require("./changePassword.repository");
const user_repository_1 = require("./user.repository");
const nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretUsername');
let UsersService = class UsersService {
    constructor(userRipo, passwordChangeRipo) {
        this.userRipo = userRipo;
        this.passwordChangeRipo = passwordChangeRipo;
    }
    create(createUserDto) {
        const customer = this.userRipo.create([Object.assign({}, createUserDto)]);
        return customer[0];
    }
    async save(createUserDto) {
        return await this.userRipo.save(createUserDto);
    }
    findAll() {
        return `This action returns all users`;
    }
    findByEmail(email) {
        return this.userRipo.findByEmail(email);
    }
    findByUsername(name) {
        return this.userRipo.findByUsername(name);
    }
    async findUserEmailOrUserName(userenters) {
        let user;
        if (userenters.username) {
            user = await this.findByUsername(userenters.username);
        }
        else {
            user = await this.findByEmail(userenters.email);
        }
        return user;
    }
    update(updateUserDto) {
        return this.userRipo.save(updateUserDto);
    }
    remove(username) {
        return `This action removes a ${username} user`;
    }
    async confirmUser(name, confirmcode) {
        return await this.passwordChangeRipo.findOne({ name, confirmcode });
    }
    async getPermissionToChangePassword(name) {
        return await this.passwordChangeRipo.findOne({ name });
    }
    async deleteExpiration(name) {
        this.passwordChangeRipo.remove(await this.passwordChangeRipo.findOne({ name }));
    }
    sendMail({ user, expireDate }) {
        const code = cryptr.encrypt(user.name).slice(0, 8);
        this.passwordChangeRipo.save({ name: user.name, confirmcode: code, expiredPasswordChange: expireDate });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'website1data@gmail.com',
                pass: 'sdoivyjdgcxkcbmv'
            }
        });
        const mailOptions = {
            from: 'website1data@gmail.com',
            to: user.email,
            subject: 'Password Change',
            html: `<div style="direction: ltr;">
      <p>to change your password enter this code:</p>
      <h1 style="background-color: silver; width: fit-content;">
      ${code}</h1>
      <br/>
      <br/>
      <br/>
      <p>thank you for using my website ${new Date().getFullYear()}</p>
      </div>`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository, changePassword_repository_1.PasswordRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map