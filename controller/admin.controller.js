const adminModel = require("../models/admin.schema");
const nodemailer = require("nodemailer");

const index = async (req, res) => {
  return await res.render("index");
}

// dashboard
const index2 = async (req, res) => {
  return await res.render("index2");
}

// signup
const signup = async (req, res) => {
  // console.log(req.body);
  try {
    await adminModel.create(req.body);
    // console.log(req.body);
    return res.redirect("/login");
  } catch (error) {
    console.error("Error during signup:", error);
  }
};

const signupPage = async (req, res) => {
  await res.render("signup");
}

// login
const login = async (req, res) => {
  // await res.render("login");
  const { username, password } = req.body;
  let user = await adminModel.findOne({ username: username });

  if (user) {
    if (user.password === password) {
      res.send("login");
      return res.cookie("user", "User.username").redirect("/");
    } else {
      console.log("Password Invalid");
    }
  } else {
    console.log("Invalid Username");
    return res.redirect("/login");
  }
}

const loginPage = async (req, res) => {
  await res.render("login")
}

// logout
const logout = (req, res) => {
  req.logout((error) => {
    if (error) {
      console.log(error);
      return false;
    } else {
      return res.redirect("/login");
    }
  })
}

// profile - logout karine back krye to without login home page pr nai jai ena mate
// const profile = (req, res) => {      //profile controller
//   res.send(req.user);
// }

// form basic
const formBasic = (req, res) => {
  return res.render("form-basic");
}

// tables
const table = async (req, res) => {
  try {
    let data = await adminModel.find();
    return res.render("tables", { data });
  } catch (error) {
    console.log(error);
    return false;
  }
}

// userni profile jova - signup page na
const profile = (req, res) => {
  let user = req.user;
  // console.log(user);
  return res.render("profile", { user });
}

// password Change
const changePassword = (req, res) => {
  return res.render("changepassword");
}

const changePasswordPage = async (req, res) => {
  console.log(req.body);
  const { oldpassword, newpassword, confirmpassword } = req.body;
  let { id } = req.user;
  // console.log(id);

  let data = await adminModel.findById(id);
  console.log(data);
  if (data.password === oldpassword) {
    if (newpassword === confirmpassword) {
      await adminModel.findByIdAndUpdate(id, { password: newpassword });
      console.log("Password Change Successfully....");
      return res.redirect("/login")
    } else {
      console.log("New Password n Confirm Password Dosen't Match..");
      return res.redirect("/changepassword");
    }
  } else {
    console.log("Old Password is Wrong..");
    return res.redirect("/changepassword");
  }
}

// reset password
const resetPassword = (req, res) => {
  return res.render("resetpassword",{
    info: req.flash("info")
  });
}

let otp = Math.floor(100000 + Math.random() * 900000);

const forgetPassword = (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 578,
      secure: false,
      auth: {
        user: "myclasswork2005@gmail.com",
        pass: "lplp mfbz sotj ujvj",
      },
    });

    const createMail = {
      from: {
        name: "Tushar Wagh",
        address: "waghtushar2005@gmai.com ",
      },
      to: req.body.email,
      subject: "Reset Password",
      html: `<h2>OTP : ${otp}</h2>`
    }
    transporter.sendMail(createMail, (error, info) => {
      if (error) {
        console.log("Error sending OTP",error);
      } else {
        console.log(info);
        res.redirect("/resetpassword");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// otp verify
const verifyOTP = (req,res)=>{
  if (req.body.otp === otp.toString()) {
    req.flash("info", "right");  
    res.redirect("/resetpassword");
  } else{
    req.flash("info", "wrong");  
  res.redirect("/resetpassword");
  }
}



module.exports = {
  index, index2,
  signupPage, signup, login, loginPage, logout,
  formBasic, table, profile, changePassword, changePasswordPage, 
  forgetPassword, resetPassword, verifyOTP
}