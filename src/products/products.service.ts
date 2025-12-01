import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly db : PrismaService) {}
  create(createProductDto: CreateProductDto) {
    return this.db.products.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.db.products.findMany();
  }

  findOne(id: number) {
    return this.db.products.findUnique({
      where: { id },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.db.products.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.db.products.delete({
      where: { id },
    });
  }
}
