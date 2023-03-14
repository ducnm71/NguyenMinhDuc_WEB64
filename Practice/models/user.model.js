const user = require('../schema/user')
const User = require('../schema/user')

exports.findById = (id) => {
    return User.findById(id)
        .then((result) => {
            result = result.toJSON()
            return result
        })
}


exports.createUser = (userData) => {
    //const user = new User(userData)
    return User.insertMany(userData)
}

exports.findByEmail = (email) => {
    return User.find({email: email}).then((result) => {
        // console.log(result[0]);
        return result[0]
    })
}

exports.list = async (req, res) => {
    return new Promise((resolve, reject) => {
        User.find()
        .exec((err,data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })    
}

exports.delete = async (email) => {
    const result = await User.deleteOne({ email: email })
    return result[0]
}