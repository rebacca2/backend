import {Entity,PrimaryGeneratedColumn,Column} from 'typeorm';
import { ObjectType,Field,ID } from '@nestjs/graphql';
@ObjectType()
@Entity()
export class User{
    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id:number;

    @Field()
    @Column()
    name:string;

    @Field()
    @Column()
    age:number;
    
}