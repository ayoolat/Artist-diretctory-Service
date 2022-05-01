import Joi from 'joi';

export class ValidationSchema {
    static validateCharacter() {
        return Joi.object().keys({
            _id: Joi.string().min(24).max(24),
            firstName: Joi.string().max(20).required(),
            lastName: Joi.string().max(20).required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: false } })
                .required(),
            gender: Joi.string().length(6).required(),
            phone: Joi.string().length(11).required(),
            address: Joi.string().max(200).required(),
            bio: Joi.string().max(300).required(),
            age: Joi.number().max(120).required(),
            movies: Joi.array()
        });
    }

    static validateMovie() {
        return Joi.object().keys({
            _id: Joi.string().min(24).max(24),
            title: Joi.string().max(20).required(),
            dateOfCreation: Joi.string().max(10),
        });
    }
}
