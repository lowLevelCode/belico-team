import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ObjectIdColumn, ObjectID, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity({name:"cat_tiposusuarios"})
export class TipoUsuario {

    @PrimaryGeneratedColumn({name:"idu_tipousuario"})
    idu_tipousuario :number;

    @Column({ length: 30, nullable: false })  
    nom_tipousuario :string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })  
    fec_alta  :Date;
    
    @OneToMany(type => Usuario, usuario => usuario.tipousuario)
    usuarios: Usuario[];
}