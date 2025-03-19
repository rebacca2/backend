import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {GraphQLModule} from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { User } from './user/user.entity';
import { Book } from './book/book.entity';
import { BookModule } from './book/book.module';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'19990126sypzw',
      database:'test_nestjs',
      entities:[User,Book],
      synchronize:true
    }),
    GraphQLModule.forRoot({
      autoSchemaFile:true,
      playground:true,
      driver: ApolloDriver,
    }),
    UserModule,
    BookModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
