import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository:Repository<Book>
  ) {}

  findAll():Promise<Book[]>{
    return this.bookRepository.find()
  }

  findOne(id:number):Promise<Book>{
    return this.bookRepository.findOneBy({id})
  }

  create(name:string,factory:string):Promise<Book>{
    const book= this.bookRepository.create({name,factory});
    return this.bookRepository.save(book)
  }

  async update(id:number,name:string,factory:string):Promise<Book>{
    const book=await this.bookRepository.findOneBy({id})
    if(book){
      book.name=name
      book.factory=factory
      return this.bookRepository.save(book)
    }
    return null
  }

  remove(id:number):Promise<void>{
    return this.bookRepository.delete({id}).then(()=>{})
  }
  
  
}
