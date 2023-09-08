const nodemailer=require('nodemailer');

//transporter

 const transporter= nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"anilg7887@gmail.com",
        pass:"ymlpdsh.."
    }
  })

  const info={
    from:"anilg7887@gmail.com",
    to:"shubham@gmail.com",
    subject:"Nodemailer email application",
    text:`Welcome To Bharat`
  }

  transporter.sendMail(info,(err,result)=>{
    if(err){
        console.log("Error in sending Mail",err);
    }
    else{
        console.log("Mail sent successfully",info);
    }
  })



//   // send email Link For reset Password
// router.post("/sendpasswordlink",async(req,res)=>{
//     console.log(req.body)

//     const {email} = req.body;

//     if(!email){
//         res.status(401).json({status:401,message:"Enter Your Email"})
//     }

//     try {
//         const userfind = await userdb.findOne({email:email});

//         // token generate for reset password
//         const token = jwt.sign({_id:userfind._id},keysecret,{
//             expiresIn:"120s"
//         });
        
//         const setusertoken = await userdb.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});


//         if(setusertoken){
//             const mailOptions = {
//                 from:process.env.EMAIL,
//                 to:email,
//                 subject:"Sending Email For password Reset",
//                 text:`This Link Valid For 2 MINUTES http://localhost:3001/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
//             }

//             transporter.sendMail(mailOptions,(error,info)=>{
//                 if(error){
//                     console.log("error",error);
//                     res.status(401).json({status:401,message:"email not send"})
//                 }else{
//                     console.log("Email sent",info.response);
//                     res.status(201).json({status:201,message:"Email sent Succsfully"})
//                 }
//             })

//         }

//     } catch (error) {
//         res.status(401).json({status:401,message:"invalid user"})
//     }



// for otp send in email

const nodemailer = require('nodemailer');

// Create a function to generate a random 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

router.post("/sendpasswordotp", async (req, res) => {
    console.log(req.body);

    const { email } = req.body;

    if (!email) {
        res.status(401).json({ status: 401, message: "Enter Your Email" });
    }

    try {
        const userfind = await userModel.findOne({ email: email });

        if (!userfind) {
            throw new Error("User not found");
        }

        const otp = generateOTP();

        const setusertoken = await userModel.findByIdAndUpdate({ _id: userfind._id }, { otp: otp }, { new: true });

        if (setusertoken) {
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Sending Email For Password Reset",
                text: `Your OTP for password reset is: ${otp}` // Include the OTP in the email body
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error:", error);
                    res.status(401).json({ status: 401, message: "Email not sent" });
                } else {
                    console.log("Email sent", info.response);
                    res.status(201).json({ status: 201, message: "Email sent successfully" });
                }
            });
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({ status: 401, message: "Invalid user" });
    }
});
