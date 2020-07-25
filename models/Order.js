const mongoose = require('mongoose') ;

const orderSchema = mongoose.Schema({

user : {
    type :   mongoose.Schema.Types.ObjectId ,
    ref  :    'User' ,
    required : true
}  ,
product :{
    
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'product' ,
    required : true
    
}  


});

module.exports = mongoose.model('Order' , orderSchema)




