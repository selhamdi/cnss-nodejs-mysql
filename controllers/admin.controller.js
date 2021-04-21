const bcrypt = require('bcrypt');
const { Admin } = require('../models')
const jwt = require('jsonwebtoken');

const ACCSS_TOKEN = 'tokenacces'

 const addAdmin = async (req, res) => {

        try {
                
                Admin.create({
                        email : 'naoufelbenmensour@gmail.com',
                        password : 'azer'
                })

                res.send("added")
                
            }
            catch (err) {
                res.json(err)
            }
     
}


const all = async (req, res) => {
    let admin = await Admin.findAll();


    if (!admin) {
        error.push('employee not found')
        return res.json({
                error : error
        })
    }

    res.send(admin)
}



const loginAdmin = async (req, res, next) => {

        const {email} = req.body;

        // let error = [];


        if (!email) {

            error.push('Request missing email')

                return res.json({

                    error : error
                }
                    
                );
        }

        try {

                let admin = await Admin.findOne({

                        where: {
                            email: req.body.email
                        }
                });


                if (!admin) {
                    error.push('Admin not found')
                    return res.json({
                            error : error
                    })
                } else {
                    const token = jwt.sign({email: admin.email }, ACCSS_TOKEN)
                    res.json({token : token})
                    res.admin = admin
                    next()
                }

            }
            catch (err) {

                return res.status(400).send(err);

            }

}















module.exports = {
       loginAdmin,
       addAdmin,
       all
}




