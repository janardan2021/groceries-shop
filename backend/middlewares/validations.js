import { userSchema} from "../JoiSchemas.js";



const validateUser = (req, res, next) => {
    const result = userSchema.validate(req.body);
    if (result.error) {
        console.log(result.error)
        const msg = result.error.details.map(el => el.message).join(', ');
        // res.status(401).json({error: msg}) 
        res.status(401)
        throw new Error(msg);
    } else {
        next();
    }

}

export {validateUser}