import {Character, Gender} from "../../../entities/character";
import {MoviesDTO} from "../../moviesService/dtos/moviesDTO";
import {ObjectID} from "typeorm";

export class CharactersDTO{

    constructor(character : Character) {
        this.firstName = character.firstName
        this.lastName = character.lastName
        this.email = character.email
        this.gender = character.gender
        this.phone = character.phone
        this.address = character.address
        this.bio = character.bio
        this.age = character.age
        this.movies = character.movie
    }

    _id : ObjectID

    firstName: string

    lastName: string

    gender: Gender

    email: string

    phone: string

    address: string

    bio: string

    age: number

    movies : MoviesDTO[]
}