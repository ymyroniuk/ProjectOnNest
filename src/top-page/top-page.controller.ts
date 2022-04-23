import { Body,
    Controller, 
    Post, 
    Param, 
    Get, 
    Delete, 
    Patch, 
    HttpCode, 
    UsePipes, 
    ValidationPipe, 
    NotFoundException, 
    UseGuards, 
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import { TOP_PAGE_NOT_FOUND_ERROR } from './top-page.constants';
import { IdValidationPipe } from '../pipes/id-validation.pipes';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {
    constructor(private readonly topPageService: TopPageService){ }
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() dto: CreateTopPageDto) {
        return this.topPageService.create(dto);
    }
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id', IdValidationPipe) id: string) {
        const topPage = await this.topPageService.getById(id);
        if(!topPage) {
            throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
        }
        return topPage;
    }
    @Get('byAlias/:alias')
    async getByAlias(@Param('alias') alias: string) {
        const topPage = await this.topPageService.getByAlias(alias);
        if(!topPage) {
            throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
        }
        return topPage;
    }
    @Get('byText/:text')
    async getByText(@Param('text') text: string) {
        const topPage = await this.topPageService.getByText(text);
        if(!topPage) {
            throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
        }
        return topPage;
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedTopPage = await this.topPageService.deleteById(id);
        if(!deletedTopPage) {
            throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
        }
        return deletedTopPage;
    }
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
        const updatedTopPage = await this.topPageService.updateById(id, dto);
        if(!updatedTopPage) {
            throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
        }
        return updatedTopPage;
    }
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindTopPageDto) {
        return this.topPageService.findByCategory(dto.firstCategory);
    }
}
