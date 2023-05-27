const userModel = require("../Models/UserModel");
const userActivity = require("../Models/UserActivity");
const downloadActivity = require("../Models/DownloadActivity")
const asyncHandler = require("express-async-handler");
const generateToken = require("../util/generateToken");
var currentdate = new Date(); 
var time =
  currentdate.getDate() +
  "/" +
  (currentdate.getMonth() + 1) +
  "/" +
  currentdate.getFullYear() +
  " @ " +
  currentdate.getHours() +
  ":" +
  currentdate.getMinutes() +
  ":" +
  currentdate.getSeconds();

const userRegisterController = asyncHandler(async (req, res) => {
  console.log('Req accepted')
  const { name, email, password } = req.body;
  console.log(req.body)
  const userfound = await userModel.findOne({ email });
  if (userfound) {
    res.status(400);
    throw new Error("USER ALREADY EXIST");
  }
  console.log('ggwp')
  const usercreate = await userModel.create({
    name,
    email,
    password
    
  });

  if (usercreate) {
    const activity = "Signed up"
    const activitycreate = await userActivity.create({
      name,
      email,
      activity,
      time,
    });
    if (activitycreate) {
      
    
      res.json({
        _id: usercreate._id,
        name: usercreate.name,
        email: usercreate.email,
        token: generateToken(usercreate._id)
      });
    }
  }
});




const userLoginController = asyncHandler(async (req, res) => {
 
  const { email, password } = req.body;

  const userfound = await userModel.findOne({ email,password });
  console.log(userfound)
  if (userfound) {
    
    
    const activity = "Log in"
    const name = userfound.name
    const activitycreate = await userActivity.create({
      name,
      email,
      activity,
      time,
    });
    if (activitycreate) {
      console.log('Sending response')
      res.json({
        _id: userfound._id,
        name: userfound.name,
        email: userfound.email,
      
        token: generateToken(userfound._id),
      });
    }
  } else {
    
    throw new Error('Invalid Email or Password')
  }
});




const userAllController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  const user = await userModel.find();
  console.log(user);
  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error("No Users Available");
  }
});

const userOneController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("Get Req accepted");
  const user = await userModel.findById(id);
  console.log(user);
  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error("No Users Available");
  }
});


const userActivityAllController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  const user = await userActivity.find();
  console.log(user);
  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error("No Users Available");
  }
});




const userDeleteController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const id = req.params.id;
  console.log(req.body);
  const user = await userModel.findById( id );
  console.log(user);
  if (user) {
    await user.remove();
    res.json({ message: "User has been removed" });
  }
  else {
    throw new Error("Error Occured. User Not deleted");
  }
});


const userUpdateController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const { name, email, password } = req.body;
  const id = req.params.id;
  console.log(req.body);
  const user = await userModel.findById( id );
  console.log(user);
  if (user) {
    user.name = name;
   
    user.email = email;
    user.password = password;

    const updateduser = await user.save();
    res.json(updateduser);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
});


const DownloadActivity = asyncHandler(async (req, res) => {
  const { name, email, activity } = req.body;
  const activitycreate = await downloadActivity.create({
    name,
    email,
    activity,
    time,
  });

  if (activitycreate) {
    res.json({"Message":"Donwloaded Successfully"})
  }

})


const GetDownloadActivity = asyncHandler(async (req, res) => {
 
  const activitycreate = await downloadActivity.find();

  if (activitycreate) {
    res.json(activitycreate);
  }
});

const GetDownloadActivityPerUser = asyncHandler(async (req, res) => {
  const {email} = req.body
  const activitycreate = await downloadActivity.find({email});

  if (activitycreate) {
    res.json(activitycreate);
  }
});

const DownloadActivityDelete = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const id = req.params.id;
  console.log(req.body);
  const user = await downloadActivity.findById(id);
  console.log(user);
  if (user) {
    await user.remove();
    res.json({ message: "User has been removed" });
  } else {
    throw new Error("Error Occured. User Not deleted");
  }
});


module.exports = {
  userRegisterController,
  userLoginController,
  userAllController,
  userUpdateController,
  userDeleteController,
  userOneController,
  userActivityAllController,
  DownloadActivity,
  GetDownloadActivity,
  GetDownloadActivityPerUser,
  DownloadActivityDelete,
};
