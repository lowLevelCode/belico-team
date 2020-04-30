import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ObjectIdColumn, ObjectID, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class TipoUsuario {

    @ObjectIdColumn()
    id: ObjectID;    

    @Column({ nullable: false })  
    idu_tipousuario :number;

    @Column({ length: 30, nullable: false })  
    nom_tipousuario :string;

    @Column({ nullable: false })  
    fec_alta  :Date;
    
}