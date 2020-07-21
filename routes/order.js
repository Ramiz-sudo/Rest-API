const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/addorder' , (req , res , next)=>{
    const newOrder = new Order({
        user : req.body.user ,
        product : req.body.product
    })


    newOrder.save().
    then(doc=>{
        res.status(200).json({
            massage : doc
        })
    })
    .catch(err =>{
        res.status(404).json({
            massage : err
        })
    })
})

router.get('/' , (req , res , next)=>{
    Order.find().populate('user' , 'user name').
    then(doc=>{
        res.status(200).json({
            massage : doc
        })
    }).
    catch(err =>{
        res.status(404).json({
            massage : err
        })
    })
})

module.exports = router;