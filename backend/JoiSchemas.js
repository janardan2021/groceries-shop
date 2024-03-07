// const BaseJoi = require('joi');
import BaseJoi from 'joi'
// const sanitizeHtml = require('sanitize-html');
import sanitizeHtml from 'sanitize-html'


const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)


const userSchema = Joi.object({
    name: Joi.string()
            .label('User Name')
            .alphanum()
            .escapeHTML(),
    email: Joi.string()
            .label('Email')
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'info'] } })
            .required()
            .escapeHTML(),
    password: Joi.string()
             .label('Password')
             .max(1000)
             .required()
             .escapeHTML()
})

export {userSchema}