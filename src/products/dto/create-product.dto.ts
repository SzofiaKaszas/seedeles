export class CreateProductDto {
  name: string;
  price: number;
  expiration?: Date | null;
}
