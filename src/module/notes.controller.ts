import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Notes } from 'src/database/entity/NotesEntity';
import { NotesRepository } from 'src/database/repository/notes.repository';
import { NotesBody } from './dto/notes.dto';
import { NotesPost } from './notes.service';

@ApiTags('Notas')
@Controller('notes')
export class NotesController {
  private notesPost: NotesPost;
  constructor() {
    this.notesPost = new NotesPost(new NotesRepository(Notes));
  }

  @ApiOperation({ summary: 'Get all the books' })
  @Get()
  getAllNotes() {
    return [];
  }

  @ApiOperation({ summary: 'Record notes to be analyzed' })
  @ApiBody({ type: NotesBody })
  @Post()
  async getHello(@Body() body: NotesBody) {
    await this.notesPost.execute(body);
  }
}
