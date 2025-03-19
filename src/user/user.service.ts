import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>
  ) {}

  findAll():Promise<User[]>{
    return this.userRepository.find()
  }

  findOne(id:number):Promise<User>{
    return this.userRepository.findOneBy({id})
  }

  create(name:string,age:number):Promise<User>{
    const user= this.userRepository.create({name,age});
    return this.userRepository.save(user)
  }

  async update(id:number,name:string,age:number):Promise<User>{
    const user=await this.userRepository.findOneBy({id})
    if(user){
        user.name=name
        user.age=age
        return this.userRepository.save(user)
    }
    return null
  }

  remove(id:number):Promise<void>{
    return this.userRepository.delete({id}).then(()=>{})
  }
  
  getUser(): string {
    return 'User A,User B';
  }

  getDefault(): string {
    return 'Default A,Default B';
  }
}
