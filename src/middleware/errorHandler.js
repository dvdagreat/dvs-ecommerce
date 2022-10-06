export default function errorHandler(error, req, res, next) {

    if(error.name === 'TypeError') {
        return res.status(500).json({message: error.message});    
    }

    return res.status(error.statusCode ?? 400).json({message: error.message});
}