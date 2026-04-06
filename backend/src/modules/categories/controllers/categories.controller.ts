import { Controller, Post, Get, Delete, Patch, Body, Param, UseGuards } from "@nestjs/common";
import { CategoriesService } from "../application/services/categories.service";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { JwtGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { AdminGuard } from "src/modules/auth/guards/admin.guard";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @UseGuards(JwtGuard, AdminGuard)
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get("slug/:slug")
  findBySlug(@Param("slug") slug: string) {
    return this.service.findBySlug(slug);
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.service.findById(id);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateCategoryDto
  ) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.service.delete(id);
  }
}