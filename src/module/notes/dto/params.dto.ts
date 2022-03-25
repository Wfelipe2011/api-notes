import { ApiProperty } from '@nestjs/swagger';
import { clientId, dateFrom, dateTo, key, status } from '../config/swagger';

export class IParams {
  @ApiProperty(key)
  key: string;

  @ApiProperty(clientId)
  clientId?: string;

  @ApiProperty(dateFrom)
  dateFrom?: string;

  @ApiProperty(dateTo)
  dateTo?: string;

  @ApiProperty(status)
  status?: 'analyse' | 'success' | 'process' | 'pending' | 'invalid';
}

export class IParamsAnalytics {
  @ApiProperty(key)
  key: string;

  @ApiProperty({ ...clientId, required: false })
  clientId?: string;

  @ApiProperty(dateFrom)
  dateFrom?: string;

  @ApiProperty(dateTo)
  dateTo?: string;

  @ApiProperty(status)
  status?: 'analyse' | 'success' | 'process' | 'pending' | 'invalid';
}
