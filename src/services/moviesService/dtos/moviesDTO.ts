import {Movies} from "../../../entities/movies";
import {ObjectID} from "typeorm";

export class MoviesDTO{

    constructor(movies : Movies) {
        this.title = movies.title
        this.dateOfCreation = movies.dateOfCreation
    }
    _id: ObjectID

    title: string

    dateOfCreation: string
}