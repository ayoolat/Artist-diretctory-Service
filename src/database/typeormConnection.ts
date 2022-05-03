import {DataSource, createConnection, getConnection, getConnectionManager} from 'typeorm';

export class TypeormConnection {
    private dbConnect!: DataSource;
    private static instanceOf: TypeormConnection;

    private constructor() {}

    public static get instance(): TypeormConnection {
        return this.instanceOf || (this.instanceOf = new TypeormConnection())
    }

    public async create() {
        try {
            this.dbConnect =  await createConnection()
            console.log(this.dbConnect.entityMetadatas)
            return this.dbConnect
        }catch (e : any) {
           throw e
        }
    }
}