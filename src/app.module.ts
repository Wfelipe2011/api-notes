import { Module } from '@nestjs/common';
import { NotesController } from './module/notes.controller';
@Module({
  imports: [],
  controllers: [NotesController],
  providers: [],
})
export class AppModule {}
