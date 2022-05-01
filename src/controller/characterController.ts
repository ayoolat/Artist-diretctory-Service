import {CharactersService} from "../services/charactersService/charactersService";
import {Request, Response} from "express";
import {ObjectID} from "typeorm";

export class CharacterController{
    constructor(private characterService : CharactersService) {
    }

    public async addCharacter(request : Request , response : Response) : Promise<Response>{
        const res = await this.characterService.addCharacter(request.body)
        return response.status(200).send(res)
    }

    public async updateCharacter(request : Request , response : Response) : Promise<Response>{
        const res = await this.characterService.updateCharacter(request.body, request.params.id)
        return response.status(200).send(res)
    }

    public async getAllCharacter(response : Response) : Promise<Response> {
        const res = await this.characterService.getAllCharacter()
        return response.status(200).send(res)
    }

    public async getMovieById (request : Request , response : Response) : Promise<Response> {
        const res = await this.characterService.getMovieById(request.params.id)
        return response.status(200).send(res)
    }
}