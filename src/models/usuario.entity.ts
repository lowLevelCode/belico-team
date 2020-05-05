import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ObjectIdColumn, ObjectID, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { TipoUsuario } from './tipoUsuario.entity';

@Entity({name:"cat_usuario"})
export class Usuario {
    

    @PrimaryGeneratedColumn()
    idu_usuario:number;

    @Column({ length: 100, nullable: false })  
    nom_usuario:string;

    @Column({ length: 50, nullable: false })  
    clv_usuario:string;
    
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })  
    fec_alta :Date;
    
    @Column({ nullable: false , default:1})  
    opc_activo :number;
    
    @Column({ nullable: false ,default:0})  
    eliminado :number;    
    
    @ManyToOne(type => TipoUsuario, tipoUsuario => tipoUsuario.usuarios)
    @JoinColumn({name: 'idu_tipousuario'})
    tipousuario: TipoUsuario;

}