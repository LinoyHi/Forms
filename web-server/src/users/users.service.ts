import { Injectable } from '@nestjs/common';
import { PasswordRepository } from './changePassword.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePassword } from './entities/changePassword.entity';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
const nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretUsername');

@Injectable()
export class UsersService {
  constructor(private userRipo: UserRepository, private passwordChangeRipo: PasswordRepository) { }

  create(createUserDto: CreateUserDto) {
    const customer = this.userRipo.create([{ ...createUserDto }]);
    return customer[0]
  }

  async save(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRipo.save(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findByEmail(email: string): Promise<User> {
    return this.userRipo.findByEmail(email);
  }

  findByUsername(name: string): Promise<User> {
    return this.userRipo.findByUsername(name);
  }

  async findUserEmailOrUserName(userenters:{username:string,email:string}){
    let user :CreateUserDto;
    if (userenters.username) {
      user = await this.findByUsername(userenters.username)
    }
    else {
      user = await this.findByEmail(userenters.email)
    }
    return user
  }

  update( updateUserDto: UpdateUserDto) {
    return this.userRipo.save(updateUserDto);
  }

  remove(username: string) {
    return `This action removes a ${username} user`;
  }

  async confirmUser(name:string,confirmcode:string) : Promise<ChangePassword>{
    return await this.passwordChangeRipo.findOne({name, confirmcode})
  }

  async getPermissionToChangePassword(name: string): Promise<ChangePassword>{
    return await this.passwordChangeRipo.findOne({name})
  }

  async deleteExpiration(name:string){
    this.passwordChangeRipo.remove(await this.passwordChangeRipo.findOne({name}))
  }

  sendMail({ user, expireDate },) {
    const code = cryptr.encrypt(user.name).slice(0,8)

    this.passwordChangeRipo.save({name:user.name, confirmcode: code, expiredPasswordChange: expireDate})

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'website1data@gmail.com', //this is a fake email you are welcome to
                                        // use it just keep in mind you won't be able 
                                        //to log in to it so highly recommend for you to change it
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
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
