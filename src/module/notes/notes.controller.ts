import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Notes } from 'src/database/entity/NotesEntity';
import { NotesRepository } from 'src/database/repository/notes.repository';
import { description, descriptionAnalytics } from './config/swagger';
import { NotesBody } from './dto/notes.dto';
import { IParams, IParamsAnalytics } from './dto/params.dto';
import { NotesRequestBody } from './dto/request.dto';
import { GetNotes } from './useCase/get.notes';
import { GetNotesAnalytics } from './useCase/get.notes-analytics';
import { PostNotes } from './useCase/post.notes';

@ApiTags('Notas')
@Controller('notes')
export class NotesController {
  private notesPost: PostNotes;
  private notesGet: GetNotes;
  repository: NotesRepository;
  getNotesAnalytics: GetNotesAnalytics;

  constructor() {
    this.notesPost = new PostNotes(new NotesRepository(Notes));
    this.notesGet = new GetNotes(new NotesRepository(Notes));
    this.getNotesAnalytics = new GetNotesAnalytics(new NotesRepository(Notes));
    this.repository = new NotesRepository(Notes);
  }

  @ApiOperation(description)
  @ApiResponse({ status: 200, type: [NotesBody] })
  @Get()
  async getAllNotes(@Query() params: IParams) {
    return await this.notesGet.execute(params);
  }

  @ApiOperation(descriptionAnalytics)
  @ApiResponse({ status: 200, type: [NotesBody] })
  @Get('analytics')
  async notesAnalytics(@Query() params: IParamsAnalytics) {
    return await this.getNotesAnalytics.execute(params);
  }

  @ApiOperation({ summary: 'Record notes to be analyzed' })
  @Post()
  async getHello(@Body() body: NotesRequestBody) {
    await this.notesPost.execute(body);
  }

  @ApiOperation({ summary: '[ test ] delete all notes' })
  @Delete()
  async delete() {
    const data = await this.repository.find<NotesBody>();
    data.forEach(async (body) => {
      await this.repository.delete(body._id);
    });
  }
}
