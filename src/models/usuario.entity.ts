import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TipoUsuario } from './tipoUsuario.entity';

@Entity({name:"cat_usuario"})
export class Usuario {
    

    @PrimaryGeneratedColumn({name:"idu_usuario"})
    id:number;

    @Column({ length: 100, nullable: false })  
    nombre:string;

    @Column({ length: 50, nullable: false })  
    contraseña:string;
    
    @Column({ name:"fec_alta", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })  
    createAt :Date;
    
    @Column({ name:"opc_activo", nullable: false , default:1})  
    opcActivo :number;
    
    @Column({name:"eliminado", nullable: false ,default:0})  
    isEliminado :number;    
    
    @ManyToOne(type => TipoUsuario, tipoUsuario => tipoUsuario.usuarios)
    @JoinColumn({name: 'idu_tipousuario'})
    tipousuario: TipoUsuario;

}