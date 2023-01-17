import { Controller, Get, Post, Body, Patch, Param, Delete, 
  Session, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
const bcrypt = require('bcrypt');

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const customer = this.usersService.create(createUserDto)
    if (customer) {
      const hash = bcrypt.hashSync(createUserDto.password, 10);
      customer.password = hash
      return await this.usersService.save(customer)
    }
    throw new HttpException('not valid request', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('/login')
  async findbyUsername(
    @Body() body: { username: string, email: string, password: string },
    @Session() session: Record<string, any>
  ) {
    const user= await this.usersService.findUserEmailOrUserName(body)
    if (user && bcrypt.compareSync(body.password, user.password)) {
      session.user = user
      user.password = undefined
      return user
    }
    throw new HttpException(body.username, HttpStatus.NOT_FOUND);
  }

  @Get('/logout')
  logout(@Session() session:Record<string,any>){
    const name= session.user.name
    session.user= undefined
    return `${name} has loged out`
  }

  @Get('/connected')
  returnUser(@Session() session:Record<string,any>){
    return session.user
  }

  @Post('/forgotPassword')
  async sendMail(@Body() userAccess: {username: string, email: string, expiredate: Date}){
    const user= await this.usersService.findUserEmailOrUserName(userAccess)
    if (user){
      return this.usersService.sendMail({user:user, 
        expireDate: userAccess.expiredate})
    }
    throw new HttpException(userAccess.username||userAccess.email, HttpStatus.NOT_FOUND);
  }

  @Post('/confirmUser')
  async returnExpirationDate(@Body() {userIdentifier , code}){
    const user= await this.usersService.findUserEmailOrUserName(userIdentifier)
    const expireDate = await this.usersService.confirmUser(user.name, code)
    if(expireDate){
      return expireDate.expiredPasswordChange
    }
    throw new HttpException('no expire date found', HttpStatus.NOT_FOUND)
  }

  @Patch('/update/:identifier')
  async update(@Param('identifier') identifier: string, @Body() updateUserDto: UpdateUserDto) {
    let user = await this.usersService.findByEmail(identifier)
    if(!user){
      user = await this.usersService.findByUsername(identifier)
    }
    if (updateUserDto.password) {
      const expireDate = await this.usersService.getPermissionToChangePassword(identifier)
      if(expireDate){
        if(new Date(expireDate.expiredPasswordChange) > new Date()){
          const hash = bcrypt.hashSync(updateUserDto.password, 10);
          updateUserDto.password = hash
          this.usersService.deleteExpiration(user.name)
        }
      }
      else{
        throw new HttpException('not allowed to change password', HttpStatus.FORBIDDEN)
      }
    }
    const newUser = {...user, ...updateUserDto}
    return this.usersService.update(newUser);
  }

  @Delete(':usernam')
  remove(@Param('usernam') usernam: string) {
    return this.usersService.remove(usernam);
  }
}
