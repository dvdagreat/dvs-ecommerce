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

    if (error.name === 'JsonWebTokenError') {
        return res.status(403).json({message: 'Invalid JWT token provided'});
    }

    if(error.name === 'SequelizeForeignKeyConstraintError') {
        // adding record with foreign key that is non-existant in the parent table
        if (error.parent.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(403).json({message: 'entity does not exist or is deleted'});
        }
    }

    return res.status(error.statusCode ?? 400).json({message: error.message});
}