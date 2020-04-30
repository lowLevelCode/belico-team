import {Entity, ObjectID, Column, ObjectIdColumn, OneToMany,ManyToMany,ManyToOne} from "typeorm";

@Entity()
export class User {

    @ObjectIdColumn()
    id: number;

    @Column({nullable: true})
    testId: string;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    source: string;

    @Column({nullable: true})
    eventId: string;

    @Column({nullable: true})
    uuid: string;

    @Column({nullable: true})
    origin: string;

    @OneToMany(type => testProperties, testProperties => testProperties.user)
    properties: testProperties[];

   @OneToMany(type => UserProperty, userProperty => userProperty.user)
    userProperties: UserProperty[];

}


@Entity()
export class testProperties {
    
    @ObjectIdColumn()
    id: number;

    @Column({nullable: true})
    key: string;

    @Column({nullable: true})
    value: string;
    
    @ManyToOne(type => User, user => user.originProperties)
    user: User;
    
}

@Entity()
export class UserProperty {
    
    @ObjectIdColumn()
    id: number;

    @Column({nullable: true})
    key: string;

    @Column({nullable: true})
    value: string;
    
    @ManyToOne(type => User, user => user.userProperties)
    user: User;
    
}
