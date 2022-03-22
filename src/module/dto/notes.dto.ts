import { ApiProperty } from '@nestjs/swagger';

export class NotesBody {
  @ApiProperty({ example: 'f224e078-313c-450f-8ad9-f6c84a607096' })
  key: string;

  @ApiProperty({ example: '35220260479680001252651090001245291300863400' })
  code: string;

  @ApiProperty({ example: 'c15884ca-aa0d-11ec-b909-0242ac120002' })
  clientId: string;

  @ApiProperty({
    example: '88961840-647b-4c0a-991f-ac5b81ade256',
    required: false,
  })
  _id?: string;

  @ApiProperty({ example: new Date(), required: false })
  dateProcessed?: Date;

  @ApiProperty({ example: new Date(), required: false })
  dateCreated?: Date;

  @ApiProperty({
    example: 'analyse',
    required: false,
    description: `'analyse' | 'success' | 'process' | 'pending' | 'invalid'`,
  })
  status?: 'analyse' | 'success' | 'process' | 'pending' | 'invalid';

  @ApiProperty({ required: false })
  note?: any;
}
