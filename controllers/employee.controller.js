const bcrypt = require('bcrypt')
const { Employee } = require('../models')
const jwt = require('jsonwebtoken')

const {sendMail} = require('../services/sendMail.js')

const ACCESS_TOKEN = 'tokenaccesemployees'

const addEmployee = async (req, res) => {

    let error = [];

    try {
    
               
            // const existingEmployee = await Employee.findOne({mail : req.body.mail});


           

            // if (existingEmployee) {

            //         error.push('An account whit this mail exist ');
            //         return res.json({

            //                 error : error
            //         }) 
                    
            // }

            const newEmployee = new Employee({
    
                            name: req.body.name,
                            mail: req.body.mail,
                            cin: req.body.cin,
                            password: req.body.password,
                            dateOfBirth: req.body.dateOfBirth,
                            registration_number: req.body.registration_number,

            });
            
            const saveEmployee = await newEmployee.save();

            res.json({message : 'Employee added'})



            let subject = "Account verification";
            let text = "CNSS Maroc";
            let output;
            output = `
            <h2>This is  Your Registration Number  and Password , Keep it Safe !!!</h2>
            <p> Registration Number : ${req.body.password}</p>
            <p> Password : ${req.body.registration_number}</p>`;

            sendMail(req.body.mail,subject,text,output);

            

            
        }
        catch (err) {
            res.json(err)
        }
 
}





const loginEmployee = async (req, res, next) => {

    const {mail} = req.body;

    let error = [];


    if (!mail) {

        error.push('Request missing email')

            return res.json({

                error : error
            }
                
            );
    }

    try {

            let employee = await Employee.findOne({

                    where: {
                        mail: req.body.mail
                    }
            })


            if (!employee) {
                error.push('employee not found')
                return res.json({
                        error : error
                })
            } else {
                const token = jwt.sign({mail : employee.mail}, ACCESS_TOKEN)
                res.json({token : token})
                res.employee = employee
                next()
            }

            res.send(employee)

            // if (await bcrypt.compare(password, employee.password)) {


            // const token = jwt.sign({mail: employee.mail }, ACCESS_TOKEN);


            // res.json({
            //         message : "login success",
            //         token : token,
            //         id : employee.id
            // })

                

                
            // }else{
            //     error.push('invalid credentials ');
            //     return res.json({
            //             error : error
            //     }) 
            // }




        }
        catch (err) {

            return res.status(400).send(err);

        }

}




const getAllEmployee = async (req, res ) =>{


    let employee = await Employee.findAll();


    if (!employee) {
        error.push('employee not found')
        return res.json({
                error : error
        })
    }

    res.send(employee)

}


const employeeById = async (req,res) =>{


    let employee = await Employee.findOne({id : req.body.id})


    if (!employee) {
        error.push('employee not found')
        return res.json({
                error : error
        })
    }

    res.send(employee)

}






module.exports = {
    addEmployee,loginEmployee,getAllEmployee,employeeById
}
