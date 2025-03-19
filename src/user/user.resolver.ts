import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './user.dto';
interface Result{
    info:String
}
@Resolver(()=>User)
export class UserResolver {
  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>
  ) {}

  @Query(()=>[User])
  users():Promise<User[]>{
    return this.userRepository.find()
  }


  @Query(()=>User)
  user(@Args('id')id:number):Promise<User>{
    return this.userRepository.findOneBy({id})
  }

  @Mutation(()=>User)
  create(@Args('name')name:string,@Args('age')age:number):Promise<User>{
    const user= this.userRepository.create({name,age});
    return this.userRepository.save(user)
  }

  @Mutation(()=>User)
  async update(@Args('id')id:number,@Args('name')name:string,@Args('age')age:number):Promise<User>{
    const user=await this.userRepository.findOneBy({id})
    if(user){
        user.name=name
        user.age=age
        return this.userRepository.save(user)
    }
    return null
  }

  @Mutation(()=>User)
  async remove(@Args('id')id:number):Promise<User>{  
    const user=await this.userRepository.findOneBy({id})
    if(user){
        return this.userRepository.delete({id}).then(()=>user).catch(()=>null)
    }    
    return null
  }
  
//   getUser(): string {
//     return 'User A,User B';
//   }

//   getDefault(): string {
//     return 'Default A,Default B';
//   }
}
