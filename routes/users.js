var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { base } = require('../models/user');

async function compare(pass1, pass2){
   return await bcrypt.compare(pass1, pass2)
}

async function hashPass(password) {
  
  try{
  return await bcrypt.hash(password, 10)
  }catch(err){
    throw new Error("password is required")
  }
}
router.post('/signup', (req, res, next) => {
  const {username, password} = req.body

  hashPass(password).then(data => {
    new User({username, password: data}).save().then(user => {
      res.status(201).json({msg: "user created", data: user})
    }).catch(err => {
      res.status(400).json({msg: "cannot create user!"})
    })
    
  }).catch(err => {
    console.log(err);
    res.status(400).send("password is required")
  })

  // bcrypt.hash(req.body.password , 10 , (err , hash)=>{
  //   if(err){
  //     res.status(404).json({
  //       massage : err
  //     })
  //   }else{
  //     console.log(hash)
      // const user = new User({
      //   username: req.body.username,
      //   password: hash,
      // })
      // .save();
  // user
  //   .then((resualt) => {
  //     console.log(resualt)
  //     res.status(201).json({
  //       massage: 'user created',
  //     });
  //   })
  //   .catch(() => {
  //     res.status(409).json({
  //       massage: 'already exist',
  //     });
  //   });
    // }
  // })
  
});

router.post('/signin', (req, res, next) => {
  const user = User.findOne({ username: req.body.username }).exec();
  
  user.then(data => {
    console.log(data)
  }).catch(err => {
    console.error(err)
  })
  
});

router.patch('/updatuser/:id' , (req , res , next)=>{
  bcrypt.hash(req.body.password , 10).
  then(hash=>{
    const newuser = {
      username : req.body.username ,
      password : hash ,
    }
    User.findOneAndUpdate({_id : req.params.id} , {$set : newuser}).
    then(resualt =>{
      if(resualt){
        res.status(202).json({
          massage : 'user alredy to updated'
        })
      }else{
        res.status(404).json({
          massage : 'user not in'
        })
      }
     
    }).
    catch((err) => {
      res.status(404).json({
        massage: err,
      });
    })
  }).
  catch((err) => {
    res.status(404).json({
      massage: err,
    });
  })
})


router.delete('/deleteuser/:id' , (req , res , next)=>{
  User.findOneAndDelete({_id : req.params.id}).
  then(resualt=>{
    if(resualt){
      res.status(200).json({
        massage : 'user delete'
      })
    }else{
      res.status(404).json({
        massage : 'user not fuond'
      })
    }
    
    
  }).
  catch((err) => {
    res.status(404).json({
      massage: err,
    });
  })
})



module.exports = router;
