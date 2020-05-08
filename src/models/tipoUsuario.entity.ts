import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ObjectIdColumn, ObjectID, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity({name:"cat_tipousuario"})
export class TipoUsuario {

    @PrimaryGeneratedColumn({name:"idu_tipousuario"})
    id :number;

    @Column({ length: 30, nullable: false })  
    nombre :string;

    @Column({ name:"fec_alta", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })  
    createAt  :Date;
    
    @OneToMany(type => Usuario, usuario => usuario.tipousuario)
    usuarios: Usuario[];
}