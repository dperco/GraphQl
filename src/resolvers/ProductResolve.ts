import { Resolver,Query,Mutation,Arg } from "type-graphql";
import { DataSource } from "typeorm";
import { Product } from "../entity/Products";

@Resolver()
export class ProductResolver{

    @Mutation(()=>Boolean)
    async createProduct(     
        @Arg("name") name: string,
        @Arg("quantity") quantity:number
    ){
       const newProd= new Product()
       newProd.name = name
       newProd.quantity=quantity
       await Product.getRepository().save(newProd)
       return true
    }

    @Query(()=>[Product])
    getProduct(){
        return Product.find()
    }

}