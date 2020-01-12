const db = require('../database/dbConfig');

function find(){
    return db('users').select('id', 'username');
}

//use function for registration
function add(user){
    return db('users')
        .insert(user)
}

function findById(id){
    return db('users')
        .select('id', 'username')
        .where({id})
        .first();
}

function findBy(filter){
    return db('users')
    .select('id', 'username', 'password')
    .where(filter);
}


module.exports= {
    find,
    add,
    findById,
    findBy
};