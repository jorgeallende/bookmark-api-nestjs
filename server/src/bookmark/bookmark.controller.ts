import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkDTO } from './dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
  ) {}

  @Get('/')
  getBookmarks() {
    return this.bookmarkService.getBookmarks();
  }

  @Post('/')
  createBookmark(@Body() dto: BookmarkDTO) {
    console.log(dto);
    return this.bookmarkService.createBookmark(
      dto,
    );
  }
}
