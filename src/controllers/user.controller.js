const express = require('express');
const sendMail = require('../utils/sendmail');
const adminMail = require('../utils/sendmail');
const User = require('../models/user.model');

const router = express.Router();

router.get("", async(req,res)=>{
    try{
        const user = await User.find().lean().exec();
        return res.status(200).send(user)
    } catch(err){
        return res.status(400).send(err.message)
    }
})

router.post('', async (req,res)=>{
    try{
        const user = await User.create(req.body);

        sendMail({
            from:`ABC_System@email.com`,
            to: `${user.email}`,
            subject: `Welcome to ABC system ${user.first_name} ${user.last_name}`,
            text: `Hi ${user.first_name}, Please Confirm your emai address --------- ${user.email}`,
          });

        adminMail({
              from:`${user.email}`,
              to: "admn1@mail.com, admin2@mail.com, admin3@mail.com, admin4@mail.com, admin5@mail.com",
              subject: `${user.first_name} ${user.last_name} has registered with us`,
              text : `Please welcome ${user.first_name} ${user.last_name}`
        })

        return res.send(user);
    }
    catch(err){
        return res.status(400).send(err.message);
    }
    
})

router.delete("/:id", async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id, req.body).lean();
        return res.status(200).send(user)
    } catch(err){
        return res.status(400).send(err.message)
    }
})

module.exports = router;