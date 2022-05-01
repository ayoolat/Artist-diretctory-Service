import {MoviesService} from "../services/moviesService/moviesService";
import {Request, Response} from "express";

export class MoviesController{
    constructor(private moviesService : MoviesService) {
    }

     public async addNewMovie(request : Request , response : Response){
        const res = await this.moviesService.addNewMovie(request.body)
        response.status(200).send(res)
    }

    public async getAllMovies (request : Request , response : Response){
        const res = await this.moviesService.getAllMovies()
        response.status(200).send(res)
    }

    public async getMovieByTitle(request : Request , response : Response ){
        const res = await this.moviesService.getMovieByTitle(request.params.title)
        response.status(200).send(res)
    }
}