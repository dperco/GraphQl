import { timeStamp } from "console";
import { Entity,Column ,PrimaryGeneratedColumn,CreateDateColumn,BaseEntity} from "typeorm";
import { Field,Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Product extends BaseEntity{

    @Field()
    @PrimaryGeneratedColumn()
    id!:number;

    @Field()
    @Column()
    name!:string;
 
    @Field()
    @Column()
    quantity!:number;

    @Field()
    @CreateDateColumn({type:'datetime'})
    createAdt!:Date;



    
}