import {MoviesService} from "../services/moviesService/moviesService";
import {NextFunction, Request, Response} from "express";

export class MoviesController{
    constructor(private moviesService : MoviesService) {
    }

     public async addNewMovie(request : Request , response : Response, next : NextFunction){
        try {
            const res = await this.moviesService.addNewMovie(request.body)
            response.status(200).send(res)
        }
        catch (e) {
            next(e)
        }
    }

    public async getAllMovies (request : Request , response : Response, next : NextFunction){
        try {
            const res = await this.moviesService.getAllMovies()
            response.status(200).send(res)
        }
        catch (e) {
            next(e)
        }
    }

    public async getMovieByTitle(request : Request , response : Response, next : NextFunction ){
        try {
            const res = await this.moviesService.getMovieByTitle(request.params.title)
            response.status(200).send(res)
        }
        catch (e) {
            next(e)
        }
    }
}