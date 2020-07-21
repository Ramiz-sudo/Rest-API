const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const product = require('../models/product');




router.get('/', (req, res, next) => {
    Product.find().
        select('_id name price').
        then(doc => {

        const respons = {
            doc : doc.map(doc=>{
                return{
                    name : doc.name ,
                    price : doc.price ,
                    _id : doc._id 
                }
            })
        }

            res.status(200).json({
                product: doc
            })
        }).
        catch(err => {
            res.status(404).json({
                massage: err
            })
        })
});


router.post('/addproduct', (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    product.save()
        .then(doc => {
            res.status(200).json({
                massage: 'added prodect'
            })
        })
        .catch(err => {
            res.status(404).json({
                massage: err
            })
        })


})

router.get('/:productID', (req, res, next) => {
    Product.find({ _id: req.params.productID }).
        then(resulalt => {
            res.status(200).json({
                product: resulalt
            })
        }).
        catch(err => {
            res.status(404).json({
                massage: err
            })
        })
})



router.patch('/:productID' ,(req , res , next)=>{
    const newproduct = {
        name : req.body.name ,
        price : req.body.price ,
    }

    product.update({_id : req.params.productID } ,{$set : newproduct}).
    then(doc=>{
        res.status(200).json({
            massage : doc
        })
    }).
    catch(err => {
        res.status(404).json({
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
        res.status(404).json({
            massage: err
        })
    })
})







module.exports = router;