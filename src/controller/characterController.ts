import {CharactersService} from "../services/charactersService/charactersService";
import {NextFunction, Request, Response} from "express";

export class CharacterController{
    constructor(private characterService : CharactersService) {
    }

    public async addCharacter(request : Request , response : Response, next : NextFunction){
        try{
            const res = await this.characterService.addCharacter(request.body)
            response.status(200).send(res)
        }
        catch (e) {
            next(e)
        }
    }

    public async updateCharacter(request : Request , response : Response, next : NextFunction){
        try {
            const res = await this.characterService.updateCharacter(request.body, request.params.id)
            return response.status(200).send(res)
        }
        catch (e) {
            next(e)
        }
    }

    public async getAllCharacter(response : Response, next : NextFunction){
        try {
            const res = await this.characterService.getAllCharacter()
            return response.status(200).send(res)
        }
        catch (e) {
            next(e)
        }
    }

    public async getMovieById (request : Request , response : Response, next : NextFunction){
        try {
            const res = await this.characterService.getMovieById(request.params.id)
            return response.status(200).send(res)
        }
        catch (e) {
            next(e)
        }
    }
}