import express, {Application, NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import {MoviesService} from "./services/moviesService/moviesService";
import {MoviesController} from "./controller/moviesController";
import {CharacterController} from "./controller/characterController";
import {CharactersService} from "./services/charactersService/charactersService";
import {ValidationSchema} from "./validator/joiValidator";
import Joi from "joi"

export class Server {
    private app: Application;
    private movieController : MoviesController
    private charactersController : CharacterController

    constructor(){
        this.app = express()
        this.movieController = new MoviesController(new MoviesService())
        this.charactersController = new CharacterController(new CharactersService())
    }

    public start (){
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        //movies routes
        this.app.post("/api/v1/addMovie", this.validationMiddleWare(ValidationSchema.validateMovie()), async (request, response) => await this.movieController.addNewMovie(request, response))
        this.app.get("/api/v1/getMovies", async (request, response) => await  this.movieController.getAllMovies(request, response))
        this.app.get("/api/v1/getMovies/:title", async (request, response) => await  this.movieController.getMovieByTitle(request, response))

        //Character routes
        this.app.post("/api/v1/addCharacter", this.validationMiddleWare(ValidationSchema.validateCharacter()), async (request, response) => await this.charactersController.addCharacter(request, response))
        this.app.put("/api/v1/updateCharacter/:id", async (request, response) => await this.charactersController.updateCharacter(request, response))
        this.app.get("/api/v1/getAllCharacters", async (request, response) => await this.charactersController.getAllCharacter(response))
        this.app.get("/api/v1/searchById/:id", async (request, response) => await this.charactersController.getMovieById(request, response))

        this.app.listen(process.env.PORT||8082, () => console.log("Server is listening"))
    }

    public validationMiddleWare(schema : Joi.ObjectSchema){
        return (req : Request, res : Response, next : NextFunction) => {
            const Validation = schema.validate(req.body)

            if(Validation.error){
                res.status(422).json({ error: Validation.error.details[0].message})
            }else{
                next()
            }
        }
    }
}