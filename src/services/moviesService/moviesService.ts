import {TypeormConnection} from "../../database/typeormConnection";
import {MoviesDTO} from "./dtos/moviesDTO";
import {ResponseDTO} from "../responseDTO";
import {Movies} from "../../entities/movies";
import {EntityNotFoundError} from "typeorm";
const { ObjectID } = require('mongodb');


export class MoviesService{
    private connection = TypeormConnection.instance.create()

    public async addNewMovie(movieDto : MoviesDTO) : Promise<ResponseDTO<MoviesDTO>>{
        //Map Movie DTO to entity
        const movie = new Movies(movieDto.title, movieDto.dateOfCreation)
        movie.dateCreated = new Date()

        return await this.connection.then(async (connection) =>{
            //Save Movie to database
            const response = await connection?.mongoManager.save(movie)
            if(response){
                const moviesDto = new MoviesDTO(response)
                return {
                    message : "message",
                    body : moviesDto,
                    error : false
                }
            }
            throw new Error("An error occurred")

        }).catch(e => {
            throw e
        })
    }

    public async getAllMovies() : Promise<ResponseDTO<MoviesDTO[]>>{
        return await this.connection.then(async (connection) =>{
            //Fetch movies from database
            const movies = await connection?.mongoManager.find(Movies)
            if(movies){
                //Map movies entity to DTO
                const moviesDto = movies.map(movie => {
                    const moviesDto = new MoviesDTO(movie)
                    moviesDto._id = movie._id
                    return moviesDto
                })
                return {
                    message : "message",
                    body : moviesDto,
                    error : false
                }
            }
            throw new EntityNotFoundError(Movies, "")

        }).catch(e => {
            throw e
        })
    }

    public async getMovieByTitle(title:string){
        return await this.connection.then(async (connection) =>{
            //Fetch movie from database
            const response = await connection?.mongoManager.findOne(Movies, {where : {title: title}})

            if(response){
                //Map movie entity to DTO
                const moviesDto = new MoviesDTO(response)
                moviesDto._id = response._id

                return {
                    message : "message",
                    body : moviesDto,
                    error : false
                }
            }
            throw new EntityNotFoundError(Movies, "")

        }).catch(e => {
            throw e
        })
    }

    public async findMovie(_id : string) : Promise<boolean> {
        return this.connection.then(async(connection) =>{
            const movie = await connection?.mongoManager.count(Movies, {_id : new ObjectID(_id)})
            if(movie > 0)
                return true

            throw new EntityNotFoundError(Movies, _id)
        })
    }
}