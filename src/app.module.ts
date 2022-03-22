import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { NotesController } from './module/notes/notes.controller';
@Module({
  imports: [],
  controllers: [NotesController],
  providers: [AppService],
})
export class AppModule {}
