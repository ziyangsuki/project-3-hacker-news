const mongoose = require('mongoose');

UserSchema = new mongoose.Schema({
    userId:{
        type: String,
    },
    account:{
        type: String
    },
    password:{
        type: String
    },
    createDate:{
        type: Date, 
        default: Date.now()
    },
}, {collection: 'user'})

exports.UserSchema = UserSchema;

// Here are some common decalaration methods
// 
// const schema = new Schema({
//     name: String,
//     binary: Buffer,
//     isTrue: Boolean,
//     created: { type: Date, default: Date.now() },
//     age: { type: Number, min: 0, max: 65, required: true },
//     mixed: Schema.Types.Mixed,
//     _someId: Schema.Types.ObjectId,
//     array: [],
//     ofString: [String], // Array of a given type
//     map: { stuff: { type: String, lowercase: true, trim: true } }, // Complex objects/nested data
// })
  