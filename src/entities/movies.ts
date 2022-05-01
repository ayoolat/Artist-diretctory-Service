import { Entity, Column } from "typeorm"
import {AuditTrail} from "./auditTrail";

@Entity()
export class Movies extends AuditTrail{
    constructor(title:string, dateOfCreation:string) {
        super()
        this.title = title
        this.dateOfCreation = dateOfCreation
    }

    @Column()
    title: string

    @Column()
    dateOfCreation: string
}