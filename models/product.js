const mongoose = require('mongoose') ;

const productSchema = mongoose.Schema({
    name :{
        type : String ,
        required : true
    },
    price :{
        type : String ,
        required : true
    },
    date:{
        type : Number ,
        required : true
    },
    state :{
        type : String ,
        required : true
    },
    model :{
        type : Number ,
        required : true
    },
    color :{
        type : String ,
        required : true
    },
});

module.exports = mongoose.model('product' , productSchema)