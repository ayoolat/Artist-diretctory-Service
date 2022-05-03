import {TypeormConnection} from "../../database/typeormConnection";
import {ResponseDTO} from "../responseDTO";
import {Movies} from "../../entities/movies";
import {EntityNotFoundError} from "typeorm";
import {CharactersDTO} from "./dtos/charatersDTO";
import {Character} from "../../entities/character";
const { ObjectID } = require('mongodb');

export class CharactersService{
    private connection = TypeormConnection.instance.create()

    public async addCharacter(characterDto : CharactersDTO) : Promise<ResponseDTO<CharactersDTO>>{
        //Map movie DTO to movie entity first
        const allMovies = characterDto.movies.map(movie => {
            const movieEntity = new Movies(movie.title, movie.dateOfCreation)
            movieEntity._id = movie._id
            return movieEntity
        })

        //Map full character DTO to character entity
        const character = new Character(characterDto.firstName, characterDto.lastName, characterDto.email, characterDto.gender, characterDto.phone, characterDto.address, characterDto.bio, characterDto.age, allMovies)
        character.dateCreated = new Date()

        return await this.connection.then(async (connection) =>{
            //Save character to database
            const response = await connection?.mongoManager.save(character)
            if(response){
                const characterDTO = new CharactersDTO(response)

                return {
                    message : "message",
                    body : characterDTO,
                    error : false
                }
            }
            throw new EntityNotFoundError(Character, "")
        }).catch(e => {
            throw e
        })
    }

    public async updateCharacter(email : string, id : string) : Promise<ResponseDTO<boolean>>{
        //Manual email and ID validation
        if(!id || !email)
            throw new Error("Enter Character Id and Email")

        return await this.connection.then(async (connection) =>{
            //Save update to database
            const response = await connection?.mongoManager.update(Character, {_id: new ObjectID(id)}, {email})

            if(response){
                return {
                    message : "message",
                    body : true,
                    error : false
                }
            }
            throw new EntityNotFoundError(Character, id)

        }).catch(e => {
            throw e
        })
    }

    public async getAllCharacter() : Promise<ResponseDTO<CharactersDTO[]>>{
        return await this.connection.then(async (connection) =>{
            //Fetch all Characters from database
            const characters = await connection?.mongoManager.find(Character)

            if(characters){
                //Map Character entity to DTO
                const characterDto = characters.map(character => {
                    const characterDto = new CharactersDTO(character)
                    characterDto._id = character._id
                    return characterDto
                })
                return {
                    message : "Characters successfully fetched",
                    body : characterDto,
                    error : false
                }
            }
            throw new EntityNotFoundError(Character, "Find all")
        }).catch(e => {
            console.log(e)
            throw e
        })
    }

    public async getMovieById(id:string){
        return await this.connection.then(async (connection) =>{
            //Fetch Character from database
            const response = await connection?.mongoManager.findOne(Character, {
                where : {_id : new ObjectID(id)}
            })

            if(response){
                //Map Character entity to DTO
                const characterDto = new CharactersDTO(response)
                characterDto._id = response._id

                return {
                    message : "message",
                    body : characterDto,
                    error : false
                }
            }
            throw new EntityNotFoundError(Character, id)

        }).catch(e => {
            throw e
        })
    }
}