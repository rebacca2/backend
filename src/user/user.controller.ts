import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './user.entity';

@Controller('user')
export class UserController {
      constructor(private readonly userService: UserService) {}
      @Get()
      getDefault(): string {
        return this.userService.getDefault();
      }
      @Get('/abc')
      getHello(): string {
        return this.userService.getUser();
      }
      // @Get('/graphql')
      // findAll(): Promise<User[]> {
      //   console.log('findall')
      //   return this.userResolver.users();
      // }
      @Get('/:id')
      findOne(@Param('id')id:number):Promise<User>{
        console.log('iddd',id)
        return this.userService.findOne(id)
      }

      @Post()
      create(@Body('name')name:string,@Body('age')age:number){
        return this.userService.create(name,age)
      }
      @Put(':id')
      update(@Param('id') id:number,@Body('name')name:string,@Body('age') age:number):Promise<User>{
        return this.userService.update(id,name,age)
      }
      // @Delete(':id')
      // remove(@Param('id')id:number):Promise<void>{
      //   return this.userService.remove(id)
      // }
}
