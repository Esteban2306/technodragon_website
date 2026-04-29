import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from '../application/brand.service';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { JwtGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @UseGuards(JwtGuard, AdminGuard)
  @Post()
  async create(@Body() dto: CreateBrandDto) {
    console.log('controller dto req:', dto)
    return this.brandService.create(dto);
  }

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('isActive') isActive?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.brandService.findAll({
      search,
      isActive: isActive !== undefined ? isActive === 'true' : undefined,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.brandService.findBySlug(slug);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.brandService.findById(id);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBrandDto,
  ) {
    return this.brandService.update(id, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: string) {
    return this.brandService.deactivate(id);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch(':id/activate')
  async activate(@Param('id') id: string) {
    return this.brandService.activate(id);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.brandService.delete(id);
  }
}