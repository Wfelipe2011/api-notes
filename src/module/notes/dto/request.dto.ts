import { ApiProperty } from '@nestjs/swagger';

export class NotesRequestBody {
  @ApiProperty({ example: 'f224e078-313c-450f-8ad9-f6c84a607096' })
  key: string;

  @ApiProperty({ example: '35220260479680001252651090001245291300863400' })
  code: string;

  @ApiProperty({ example: 'c15884ca-aa0d-11ec-b909-0242ac120002' })
  clientId: string;
}
