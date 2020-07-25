const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const product = require('../models/product');




router.get('/', (req, res, next) => {
    Product.find().
        then(doc => {
        const respons = {
            doc : doc.map(doc=>{
                return{
                    name : doc.name ,
                    price : doc.price ,
                    _id : doc._id ,
                    date : doc.date ,
                    state : doc.state ,
                    color : doc.color ,
                    model : doc.model
                }
            })
        }

            res.status(200).json({
                product: doc
            })
        }).
        catch(err => {
            res.status(405).json({
                massage: err
            })
        })
});


router.post('/addproduct', (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        date : req.body.date ,
        state : req.body.state ,
        color : req.body.color,
        model : req.body.model
        

    });

    product.save()
        .then(doc => {
            res.status(200).json({
                massage: 'added prodect'
            })
        })
        .catch(err => {
            res.status(406).json({
                massage: err
            })
        })


})

router.get('/:productID', (req, res, next) => {
    product.find({ _id: req.params.productID }).
        then(doc=> {
            res.status(200).json({
                product: doc
            })
        }).
        catch(err => {
            res.status(409).json({
                massage: err
            })
        })
})



router.patch('/:productID' ,(req , res , next)=>{
    const newproduct = {
        name : req.body.name ,
        price : req.body.price ,
        date : req.body.date ,
        state : req.body.state ,
        color : req.body.color ,
        model : req.body.model
    }

    product.update({_id : req.params.productID } ,{$set : newproduct}).
    then(doc=>{
        res.status(200).json({
            massage : doc
        })
    }).
    catch(err => {
        res.status(408).json({
            massage: err
        })
    })
})



router.delete('/:productID' , (req , res , next)=>{
    product.deleteOne({_id : req.params.productID}).
    then(doc=>{
        res.status(200).json({
            massage : doc
        })
    }).
    catch(err => {
        res.status(409).json({
            massage: err
        })
    })
})







module.exports = router;