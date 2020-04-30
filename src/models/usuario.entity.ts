import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ObjectIdColumn, ObjectID, OneToMany, ManyToOne } from 'typeorm';
import { TipoUsuario } from './tipoUsuario.entity';

@Entity()
export class Usuario {

    @ObjectIdColumn()
    id: ObjectID;    

    @Column({ nullable: false })  
    idu_usuario:number;

    @Column({ length: 100, nullable: false })  
    nom_usuario:string;

    @Column({ length: 50, nullable: false })  
    clv_usuario:string;

    @ManyToOne(type => TipoUsuario, tipoUsuario => tipoUsuario.usuarios)
    idu_tipousuario: TipoUsuario;

    @Column({ nullable: false })  
    fec_alta :Date;
        
    @Column({ nullable: false })  
    opc_activo :number;

    @Column({ nullable: false })  
    eliminado :number;    

}