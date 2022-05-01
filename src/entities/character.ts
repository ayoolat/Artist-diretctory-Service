import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm"
import {AuditTrail} from "./auditTrail";
import {Movies} from "./movies";

@Entity()
export class Character extends AuditTrail{
    constructor(firstName: string, lastName: string, email: string, gender: Gender, phone: string, address: string, bio: string,
                age: number, movies : Movies[]) {
        super()
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.gender = gender
        this.phone = phone
        this.address = address
        this.bio = bio
        this.age = age
        this.movie = movies
    }

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    gender: Gender

    @Column({unique : true})
    email: string

    @Column()
    phone: string

    @Column()
    address: string

    @Column()
    bio: string

    @Column()
    age: number

    @Column(() => Movies)
    movie: Movies[]
}

export enum Gender {
    MALE = "male",
    FEMALE = "female"
}