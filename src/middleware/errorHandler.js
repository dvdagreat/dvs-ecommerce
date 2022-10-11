export default function errorHandler(error, req, res, next) {

    if(error.name === 'TypeError') {
        return res.status(500).json({message: error.message});
    }

    if(error.name === 'SequelizeUniqueConstraintError') {
        return res.status(500).json({message: error.errors[0].message});
    }

    if(error.type === 'entity.parse.failed') {
        return res.status(403).json({message: 'json body parse failed'});
    }

    return res.status(error.statusCode ?? 400).json({message: error.message});
}