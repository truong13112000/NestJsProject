import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContentService } from '../services/content.service';

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('/get-info')
  @ApiOperation({ summary: 'Find one lectures by name' })
  @ApiResponse({
    status: 200,
    description: 'get info success',
  })
  async getInfo() {
    return await this.contentService.getInfo();
  }
}
