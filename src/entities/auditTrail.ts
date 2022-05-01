import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm"

export class AuditTrail {
    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    dateCreated: Date

    @Column()
    lastUpdated = new Date()
}