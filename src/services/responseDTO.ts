export class ResponseDTO<T>{
    message : string
    body : T
    error : boolean
}