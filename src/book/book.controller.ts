import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';

@Controller('book')
export class BookController {
      constructor(private readonly bookService: BookService) {}
    //   @Get()
    //   getDefault(): string {
    //     return this.userService.getDefault();
    //   }
      @Get()
      findAll(): Promise<Book[]> {
        console.log('findall')
        return this.bookService.findAll();
      }
      @Get('/:id')
      findOne(@Param('id')id:number):Promise<Book>{
        console.log('iddd',id)
        return this.bookService.findOne(id)
      }

      @Post()
      create(@Body('name')name:string,@Body('factory')factory:string){
        return this.bookService.create(name,factory)
      }
      @Put(':id')
      update(@Param('id') id:number,@Body('name')name:string,@Body('factory') factory:string):Promise<Book>{
        return this.bookService.update(id,name,factory)
      }
      @Delete(':id')
      remove(@Param('id')id:number):Promise<void>{
        return this.bookService.remove(id)
      }
}
