import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Request } from 'express';

interface TodoRequest extends Request {
  payload: {
    user_id: number;
  };
}

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() request: TodoRequest) {
    createTodoDto.user_id = request.payload.user_id;
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll(@Req() request: TodoRequest) {
    return this.todosService.findAll(request.payload.user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: TodoRequest) {
    return this.todosService.findOne(+id, request.payload.user_id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() request: TodoRequest,
  ) {
    return this.todosService.update(
      +id,
      updateTodoDto,
      request.payload.user_id,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: TodoRequest) {
    return this.todosService.remove(+id, request.payload.user_id);
  }
}
