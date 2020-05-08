import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@Entity({name:"sucursales"})
export class Sucursal {
    

    @PrimaryColumn()
    idSuc:number;

    @Column("varchar",  { length: 255, default:null , name:"hola"})  
    nombre:string;

    @Column("varchar",{ length: 255, default:null })  
    address:string;
        
    @Column("varchar",{ length: 100, default:null, name:"clave_establecimiento" })  
    claveEstablecimiento:string;

    @Column({type:"integer", default:0, name:"entidad_federativa"})  
    entidadFederativa :number;

    @Column("varchar", { length: 150, default:null })  
    ciudad:string;

    @Column("varchar", { length: 150, default:null })  
    calle:string;

    @Column("varchar", { length: 20, default:null })  
    numero:string;

    @Column("varchar", { length: 150, default:null })  
    colonia:string;

    @Column("varchar",{ length: 10, default:null, name:"codigo_postal" })  
    codigoPostal:string;

    @Column("varchar",{ length: 20, default:null })  
    latitud:string;

    @Column("varchar", { length: 20, default:null })  
    longitud:string;

    @Column("varchar",{ length: 20, default:null, name:"telefono_sucursal" })  
    telefonoSucursal:string;

    @Column("varchar",{ length: 20, default:null, name:"telefono_publico" })  
    telefonoPublico:string;

    @Column("varchar",{ length: 10, default:null, name:"horario_inicio" })  
    horarioInicio:string;

    @Column("varchar",{ length: 10, default:null, name:"horario_fin" })  
    horarioFin:string;

    @Column({type:"integer", default:1})  
    status :number;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created :Date;
    
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    modified :Date;

    @Column({type:"integer", default:null, name:"created_by", })  
    createdBY :number;

    @Column({type:"integer", default:null, name:"modified_by"})  
    modifiedBy :number;

    @Column({type:"integer", default:null})  
    eliminado :number;    

    @VersionColumn()
    version: number;
}