export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string; // novo campo opcional
}
//   constructor(
//     id: number,
//     name: string,
//     price: number,
//     description?: string,
//     imageUrl?: string
//   ) {
//     this.id = id;
//     this.name = name;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl; // ✅ atribuir o parâmetro corretamente
//   }
// }
