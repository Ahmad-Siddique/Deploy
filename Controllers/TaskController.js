const taskModel = require("../Models/TaskModel");
const MBSModel = require("../Models/MBSForms");
const asyncHandler = require("express-async-handler");
const generateToken = require("../util/generateToken");
// const clientModel = require("../Models/ClientModel");
const userModel = require("../Models/UserModel");
const organizationalmodel = require("../Models/Organization");
const productmodel = require("../Models/Product");
const FormT1 = require("../Models/FormT1");
const FormT1A = require("../Models/FormT1A");
const FormT2 = require("../Models/FormT2");
const FormT3 = require("../Models/FormT3");
const FormT4 = require("../Models/FormT4");
const FormT5 = require("../Models/FormT5");
const FormT6 = require("../Models/FormT6");
const FormT6A = require("../Models/FormT6A");
const FormT7 = require("../Models/FormT7");
const FormT8 = require("../Models/FormT8");
const FormT9 = require("../Models/FormT9");
const path = require("path");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hello@nowvue.live",
    pass: "sqjgvqpuujozrfgk",
  },
});

const MBSCreation = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const { name, description } = req.body;
  // console.log(req.body);
  // const createdby1 = JSON.stringify(createdby)

  if (req.file !== undefined) {
    const taskcreate = await MBSModel.create({
      name,
      description,

      MBSfile: req.file.originalname,
    });

    if (taskcreate) {
      console.log(taskcreate);
      res.json({
        _id: taskcreate._id,

        description: taskcreate.description,
        name: taskcreate.name,

        MBSfile: taskcreate.MBSfile,
        token: generateToken(taskcreate._id),
      });
    }
  } else {
    const taskcreate = await MBSModel.create({
      name,
      description,
    });

    if (taskcreate) {
      console.log(taskcreate);
      res.json({
        _id: taskcreate._id,

        description: taskcreate.description,
        name: taskcreate.name,

        token: generateToken(taskcreate._id),
      });
    }
  }
});

const MBSAllController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Task");
  const Task = await MBSModel.find().sort({ createdAt: -1 });
  console.log(Task);
  if (Task) {
    res.json(Task);
  } else {
    res.status(400);
    throw new Error("No Tasks Available");
  }
});

const MBSDeleteController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const id = req.params.id;
  console.log(req.body);
  const Task = await MBSModel.findById(id);
  console.log(Task);
  if (Task) {
    await Task.remove();
    res.json({ message: "MBS form has been removed" });
  } else {
    throw new Error("Error Occured. Task Not deleted");
  }
});

const MBSExistController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Task Exist");
  const { name } = req.body;

  const Task = await MBSModel.find({ name });
  console.log(Task);
  if (Task.length == 0) {
    console.log("Task doesnot exist");
    res.json({ message: "No" });
  } else {
    console.log("Task exist");
    res.json({ message: "Yes" });
  }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});

const MBSSendFile = async (req, res) => {
  console.log("Get Req accepted File");
  const id = req.params.id;
  const Task = await MBSModel.findById(id);

  if (Task) {
    const fileName = Task.MBSfile;
    var options = {
      root: path.join(__dirname, "../uploads/" + fileName),
    };
    console.log(options);
    const root = path.join(__dirname, "../uploads/" + fileName);
    console.log("Task exist");
    res.download(root, fileName, function (err) {
      if (err) {
        // next(err);
        console.log("Invalid");
        res.status(500);
        // res.json({ Message: "Invalid" });
      } else {
        console.log("Sent:", fileName);
        // res.json({ Message: "Valid" });
      }
    });

    // res.json(Task);
  } else {
    res.status(400);
    throw new Error("File doesnot exist");
  }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
};

const TaskCreation = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const { name, description } = req.body;
  // console.log(req.body);
  // const createdby1 = JSON.stringify(createdby)

  console.log("ggwp");

  var date = new Date();
  var current_date =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  if (req.file !== undefined) {
    const taskcreate = await taskModel.create({
      name,
      description,

      taskfile: req.file.originalname,
    });

    if (taskcreate) {
      console.log(taskcreate);
      res.json({
        _id: taskcreate._id,

        description: taskcreate.description,
        name: taskcreate.name,

        taskfile: taskcreate.taskfile,
        token: generateToken(taskcreate._id),
      });
    }
  } else {
    const taskcreate = await taskModel.create({
      name,
      description,
    });

    if (taskcreate) {
      console.log(taskcreate);
      res.json({
        _id: taskcreate._id,

        description: taskcreate.description,
        name: taskcreate.name,

        token: generateToken(taskcreate._id),
      });
    }
  }
});

const TaskAllController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Task");
  const Task = await taskModel.find().sort({ createdAt: -1 });
  console.log(Task);
  if (Task) {
    res.json(Task);
  } else {
    res.status(400);
    throw new Error("No Tasks Available");
  }
});

const TaskDeleteController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const id = req.params.id;
  console.log(req.body);
  const Task = await taskModel.findById(id);
  console.log(Task);
  if (Task) {
    await Task.remove();
    res.json({ message: "Task has been removed" });
  } else {
    throw new Error("Error Occured. Task Not deleted");
  }
});

const TaskUpdateController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const { name, description, status, users, recurringtask } = req.body;
  console.log("Request body");
  console.log(req.body);

  const id = req.params.id;

  const Task = await taskModel.findById(id);
  console.log("Task to be updated");
  console.log(Task);
  if (Task) {
    console.log("Updating");
    Task.name = name;
    Task.description = description;
    Task.status = status;
    Task.recurringtask = recurringtask;
    Task.users = users;

    console.log("Updated Task");
    const updatedTask = await Task.save();
    console.log("task saved");
    res.json(updatedTask);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
});

const TaskUpdateFileController = asyncHandler(async (req, res) => {
  console.log("Get file Req accepted");
  const { users } = req.body;
  const users1 = JSON.parse(users);
  const id = req.params.id;
  console.log(req.file.originalname);
  console.log(users1);
  const Task = await taskModel.findById(id);

  console.log(Task);
  if (Task) {
    Task.taskfile = req.file.originalname;
    if (!Task.users) {
      Task.users = users1;
    }
    console.log("Updated Task");
    const updatedTask = await Task.save();
    res.json(updatedTask);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
});

const TaskOneController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("Get Req accepted");
  const Task = await taskModel.findById(id);

  console.log(Task);
  if (Task) {
    res.json(Task);
  } else {
    res.status(400);
    throw new Error("No Task Available");
  }
});

const TaskClientsController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  // const client = await clientModel.find()
  const tasks = await taskModel.find();
  var clienttask = [];

  for (var i = 0; i < client.length; i++) {
    var taskassigned = [];
    var id = String(client[i]._id);
    for (var j = 0; j < tasks.length; j++) {
      var found = tasks[j].clients.find((elem) => {
        var data = elem;
        data.value = String(data.value);

        return data.value === id;
      });
      if (found) {
        taskassigned = [...taskassigned, tasks[j]];
      }
    }
    clienttask = [
      ...clienttask,
      { name: client[i].name, _id: client[i]._id, tasks: taskassigned },
    ];
  }

  res.json(clienttask);

  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});

const TaskUserController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  const user = await userModel.find();
  const tasks = await taskModel.find();
  var usertask = [];

  for (var i = 0; i < user.length; i++) {
    var taskassigned = [];
    var id = String(user[i]._id);
    for (var j = 0; j < tasks.length; j++) {
      var found = tasks[j].users.find((elem) => {
        var data = elem;
        data.value = String(data.value);

        return data.value === id;
      });
      if (found) {
        taskassigned = [...taskassigned, tasks[j]];
      }
    }
    usertask = [
      ...usertask,
      { name: user[i].name, _id: user[i]._id, tasks: taskassigned },
    ];
  }

  res.json(usertask);

  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});

const TaskOneUserController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  const id = req.params.id;
  console.log();
  const user = await userModel.findById(id);
  const tasks = await taskModel.find();
  var usertask = [];

  let taskassigned = [];

  for (var j = 0; j < tasks.length; j++) {
    if (tasks[j].users) {
      var found = tasks[j].users.value === id;

      if (found) {
        taskassigned = [...taskassigned, tasks[j]];
      }
    }
  }
  console.log();
  usertask = [...usertask, { name: user.name, _id: id, tasks: taskassigned }];

  res.json(usertask);

  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});

const TaskOneClientController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  const id = req.params.id;
  console.log();
  // const client = await clientModel.findById(id);
  const tasks = await taskModel.find();
  var clienttask = [];

  let taskassigned = [];

  for (var j = 0; j < tasks.length; j++) {
    var found = tasks[j].clients.find((elem) => {
      var data = elem;

      return data.value === id;
    });
    if (found) {
      taskassigned = [...taskassigned, tasks[j]];
    }
  }
  console.log();
  clienttask = [
    ...clienttask,
    { name: client.name, _id: id, tasks: taskassigned },
  ];

  res.json(clienttask);

  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});

const TaskOpenController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");

  console.log();

  const tasks = await taskModel.find();
  var clienttask = [];

  let taskassigned = [];

  for (var j = 0; j < tasks.length; j++) {
    if (!tasks[j].users) {
      taskassigned = [...taskassigned, tasks[j]];
    }
  }
  console.log();

  res.json(taskassigned);

  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});

const TaskClaimUserController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Claim");
  const { name, value, label } = req.body;
  const id = req.params.id;
  console.log();

  const Task = await taskModel.findById(id);
  if (Task) {
    Task.users = { name, value, label };
    Task.status = "Assigned";

    console.log("Updated Task");
    const updatedTask = await Task.save();
    res.json(updatedTask);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});

const TaskChangeStatusController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Status");
  const { status } = req.body;
  const id = req.params.id;
  console.log(status);
  console.log();

  const Task = await taskModel.findById(id);
  if (Task) {
    Task.status = status;

    console.log("Updated Task");
    const updatedTask = await Task.save();
    res.json(updatedTask);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});

const TaskMessagesUpdateController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Task Message Update");
  const { name, _id, message } = req.body;
  const id = req.params.id;
  console.log();

  const Task = await taskModel.findById(id);
  if (Task) {
    Task.comments = [...Task.comments, { name, _id, message }];

    console.log("Updated Task");
    const updatedTask = await Task.save();
    res.json(updatedTask);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});

const TaskUpdateUsersController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Update Task User");
  const { users } = req.body;
  const id = req.params.id;
  console.log;
  console.log(users);

  const Task = await taskModel.findById(id);
  if (Task) {
    Task.users = users;

    console.log("Updated Task");
    const updatedTask = await Task.save();
    res.json(updatedTask);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});

const TaskExistController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Task Exist");
  const { name } = req.body;

  const Task = await taskModel.find({ name });
  console.log(Task);
  if (Task.length == 0) {
    console.log("Task doesnot exist");
    res.json({ message: "No" });
  } else {
    console.log("Task exist");
    res.json({ message: "Yes" });
  }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});

const TransferTaskController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Transfer Task");
  const { transferredby, users } = req.body;
  const id = req.params.id;
  const Task = await taskModel.findById(id);
  if (Task) {
    Task.users = users;
    Task.transferredby = transferredby;
    console.log("Updated Task");
    const updatedTask = await Task.save();
    res.json(updatedTask);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});

const TaskUserTransfer = asyncHandler(async (req, res) => {
  console.log("Get Req accepted User Transfer");
  const { transferredby, users } = req.body;
  const id = req.params.id;
  const Task = await taskModel.find({ status: "Assigned" });
  let data = [];
  if (Task) {
    for (var i = 0; i < Task.length; i++) {
      if (Task[i].transferredby) {
        if (Task[i].transferredby.value === id) {
          data = [...data, Task[i]];
        }
      }
    }

    res.json(data);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});

const TaskRecurringTask = async (hours) => {
  console.log("Get Req accepted Recurr");

  const Task = await taskModel.find().sort({ name: -1 });
  let data = [];
  if (Task) {
    for (var i = 0; i < Task.length; i++) {
      if (Task[i].recurringtask == hours) {
        Task[i].status = "UnAssigned";
        await Task[i].save();
      }
    }
    console.log(Task);

    // res.json(Task);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
};

const TaskSendFile = async (req, res) => {
  console.log("Get Req accepted File");
  const id = req.params.id;
  const Task = await taskModel.findById(id);

  if (Task) {
    const fileName = Task.taskfile;
    var options = {
      root: path.join(__dirname, "../uploads/" + fileName),
    };
    console.log(options);
    const root = path.join(__dirname, "../uploads/" + fileName);
    console.log("Task exist");
    res.download(root, fileName, function (err) {
      if (err) {
        // next(err);
        console.log("Invalid");
        res.status(500);
        // res.json({ Message: "Invalid" });
      } else {
        console.log("Sent:", fileName);
        // res.json({ Message: "Valid" });
      }
    });

    // res.json(Task);
  } else {
    res.status(400);
    throw new Error("File doesnot exist");
  }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
};

const ContentAllController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Task");
  const Task = await taskModel.find().sort({ createdAt: -1 });
  console.log(Task);
  if (Task) {
    res.json(Task);
  } else {
    res.status(400);
    throw new Error("No Tasks Available");
  }
});

const ContentDeleteController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const id = req.params.id;
  console.log(req.body);
  const Task = await taskModel.findById(id);
  console.log(Task);
  if (Task) {
    await Task.remove();
    res.json({ message: "Content has been removed" });
  } else {
    throw new Error("Error Occured. Task Not deleted");
  }
});

// Organization
const OrganizationCreation = asyncHandler(async (req, res) => {
  console.log("Req accepted Organization creation");
  const { username, email, organizationname, writeup } = req.body;

  const organizationexist = await organizationalmodel.find({
    organizationname,
  });

  if (organizationexist.length != 0) {
    console.log(organizationexist);

    console.log("Already exist");
    res.status(500);
    res.json({ Message: "Organization already exist" });
  } else {
    console.log("Creating");

    const taskcreate = await organizationalmodel.create({
      email,
      username,
      organizationname,
      writeup,

      organizationimage: req.file.originalname,
    });

    if (taskcreate) {
      console.log(taskcreate);
      res.json({
        _id: taskcreate._id,
        email: taskcreate.email,
        username: taskcreate.username,
        writeup: taskcreate.writeup,

        organizationname: taskcreate.organizationname,

        organizationimage: taskcreate.image,
      });
    }
  }
});

const OrganizationAllController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Organizations");
  const Task = await organizationalmodel.find().sort({ createdAt: -1 });
  console.log(Task);
  if (Task) {
    res.json(Task);
  } else {
    res.status(400);
    throw new Error("No Organizations Available");
  }
});

const OrganizationSendFile = async (req, res) => {
  console.log("Get Req accepted File");
  const id = req.params.id;
  const Task = await organizationalmodel.findById(id);

  if (Task) {
    const fileName = Task.organizationimage;
    var options = {
      root: path.join(__dirname, "../uploads/" + fileName),
    };
    console.log(options);
    const root = path.join(__dirname, "../uploads/" + fileName);
    console.log("Organization Image exist");
    res.download(root, fileName, function (err) {
      if (err) {
        console.log("Invalid");
        res.status(500);
      } else {
        console.log("Sent:", fileName);
      }
    });
  } else {
    res.status(400);
    throw new Error("File doesnot exist");
  }
};

// Product
const ProductCreation = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const { email, username, description } = req.body;

  const taskcreate = await productmodel.create({
    email,
    username,

    description,
    productimage: req.file.originalname,
  });

  if (taskcreate) {
    console.log(taskcreate);
    res.json({
      _id: taskcreate._id,
      email: taskcreate.email,
      username: taskcreate.username,

      description: taskcreate.description,

      productimage: taskcreate.productimage,
    });
  }
});

const ProductAllController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Products");
  const Task = await productmodel.find().sort({ createdAt: -1 });
  console.log(Task);
  if (Task) {
    res.json(Task);
  } else {
    res.status(400);
    throw new Error("No Products Available");
  }
});

const ProductSendFile = async (req, res) => {
  console.log("Get Req accepted File");
  const id = req.params.id;
  const Task = await productmodel.findById(id);

  if (Task) {
    const fileName = Task.productimage;
    var options = {
      root: path.join(__dirname, "../uploads/" + fileName),
    };
    console.log(options);
    const root = path.join(__dirname, "../uploads/" + fileName);
    console.log("Product Image exist");
    res.download(root, fileName, function (err) {
      if (err) {
        console.log("Invalid");
        res.status(500);
      } else {
        console.log("Sent:", fileName);
      }
    });
  } else {
    res.status(400);
    throw new Error("File doesnot exist");
  }
};

// Form T1
const FormT1CreateOrUpdate = async (req, res) => {
  let { id, userid, email, name, tick} = req.body;
  
 
  const companyexist = await FormT1.findById(id);

  if (companyexist) {
    (companyexist.userid = userid),
      (companyexist.email = email),
      (companyexist.name = name);
    companyexist.tick = tick;
    

    console.log("Updated Company");
    const updatedCompany = await companyexist.save();

    var mailOptions = {
      from: "hello@nowvue.live",
      to: companyexist.email,
      subject: "Sending Email using Node.js",
      text: "That was easy!",
      cc: "dolly@montgomeryasia.com",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json(updatedCompany);
  } else {
    const companyexist1 = await FormT1.create({
      userid,
      email,
      name,
      tick,
    
    });

    if (companyexist1) {
      var mailOptions = {
        from: "hello@nowvue.live",
        to: companyexist1.email,
        subject: "Sending Email using Node.js",
        text: "That was easy!",
        cc: "dolly@montgomeryasia.com",
      };
      console.log("Created Company");
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json(companyexist1);
    }
  }
};





// Form T1A
const FormT1ACreateOrUpdate = async (req, res) => {
  let {
    id,
    userid,
    email,
    username,
    companyname,
   
    exhibitor,
    boothno,
    citystatecountry,
    personincharge,
    companyname1,
    phone,
    emailuser,
    countryareanumber,
    mobile,
    tick,
  } = req.body;
  
 
  const companyexist = await FormT1A.findById(id);

  if (companyexist) {
    (companyexist.userid = userid),
      (companyexist.email = email),
      (companyexist.username = username),
      (companyexist.companyname = companyname);
    companyexist.installationfile = req.file.originalname;
    companyexist.exhibitor = exhibitor;
    companyexist.boothno = boothno;
    companyexist.citystatecountry = citystatecountry;
    companyexist.personincharge = personincharge;
    companyexist.companyname1 = companyname1;
    companyexist.phone = phone;
    companyexist.emailuser = emailuser;
    companyexist.countryareanumber = countryareanumber;
    companyexist.mobile = mobile;
    companyexist.tick = tick;
    

  
    

    console.log("Updated Company");
    const updatedCompany = await companyexist.save();

    var mailOptions = {
      from: "hello@nowvue.live",
      to: companyexist.email,
      subject: "Sending Email using Node.js",
      text: "That was easy!",
      cc: "dolly@montgomeryasia.com",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json(updatedCompany);
  } else {
    const companyexist1 = await FormT1A.create({
      userid,
      email,
      username,
      companyname,
     
      exhibitor,
      boothno,
      citystatecountry,
      personincharge,
      companyname1,
      phone,
      emailuser,
      countryareanumber,
      mobile,
      tick,
    });

    if (companyexist1) {
      var mailOptions = {
        from: "hello@nowvue.live",
        to: companyexist1.email,
        subject: "Sending Email using Node.js",
        text: "That was easy!",
        cc: "dolly@montgomeryasia.com",
      };
      console.log("Created Company");
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json(companyexist1);
    }
  }
};

const FormT1AFind = asyncHandler(async (req, res) => {
  console.log("Finding Form T1");
  const { userid } = req.body;
  console.log(userid);
  const companyexist = await FormT1A.findOne({ userid });

  if (companyexist) {
    console.log(companyexist);
    console.log("Sending good data");
    res.json(companyexist);
  } else {
    res.json([]);
  }
});






const FormT1Find = asyncHandler(async (req, res) => {
  console.log("Finding Form T1");
  const { userid } = req.body;
  console.log(userid);
  const companyexist = await FormT1.findOne({ userid });

  if (companyexist) {
    console.log(companyexist);
    console.log("Sending good data");
    res.json(companyexist);
  } else {
    res.json([]);
  }
});

// Form T2
const FormT2CreateOrUpdate = async (req, res) => {
  let {
    id,
    userid,
    email,
    contractoraddress,
    boothno,
    address,
    citystatecountry,
    personincharge,
    phone,
    emailuser,
    countryareanumber,
    countrynumber,
    tick,
   
  } = req.body;

 

  const companyexist = await FormT2.findById(id);

  if (companyexist) {
    (companyexist.userid = userid),
      (companyexist.boothno = boothno),
      (companyexist.address = address),
      (companyexist.personincharge = personincharge),
      (companyexist.citystatecountry = citystatecountry),
      (companyexist.phone = phone),
      (companyexist.emailuser = emailuser),
      (companyexist.countryareanumber = countryareanumber),
      (companyexist.countrynumber = countrynumber),
      (companyexist.email = email),
      (companyexist.contractoraddress = contractoraddress);
    companyexist.tick = tick;
    

    console.log("Updated Company");
    const updatedCompany = await companyexist.save();

    var mailOptions = {
      from: "hello@nowvue.live",
      to: companyexist.email,
      subject: "Sending Email for Form T1",
      text: "That was easy! Form T2",
      cc: "dolly@montgomeryasia.com",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json(updatedCompany);
  } else {
    const companyexist1 = await FormT2.create({
      userid,
      email,
      tick,
     

      contractoraddress,
      boothno,
      address,
      citystatecountry,
      personincharge,
      phone,
      emailuser,
      countryareanumber,
      countrynumber,
    });

    if (companyexist1) {
      var mailOptions = {
        from: "hello@nowvue.live",
        to: companyexist1.email,
        subject: "Sending Email for Form T2",
        text: "That was easy! T2",
        cc: "dolly@montgomeryasia.com",
      };
      console.log("Created Company");
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json(companyexist1);
    }
  }
};

const FormT2Find = asyncHandler(async (req, res) => {
  console.log("Finding Form T2");
  const { userid } = req.body;
  console.log(userid);
  const companyexist = await FormT2.findOne({ userid });

  if (companyexist) {
    console.log(companyexist);
    console.log("Sending good data");
    res.json(companyexist);
  } else {
    res.json([]);
  }
});

// Form T3
const FormT3CreateOrUpdate = async (req, res) => {
  let {
    id,
    userid,
    email,
    led12qty,
    long12qty,
    flourescent40qty,
    ledmetal50qty,
    ledarm50qty,
    lightingsotherqty,
    singlemaxaqty,
    single24maxbqty,
    singlesqauremaxqty,
    singleroundmaxqty,
    single24squaremaxqty,
    single24roundmaxqty,
    singleisolateqty,
    powerotherqty,
    lighting100qty,
    lighting300qty,
    lightboxqty,
    ledstripqty,
    connectionotherqty,
  } = req.body;

  const companyexist = await FormT3.findById(id);

  if (companyexist) {
    (companyexist.userid = userid),
      (companyexist.email = email),
      (companyexist.led12qty = led12qty),
      (companyexist.long12qty = long12qty),
      (companyexist.flourescent40qty = flourescent40qty),
      (companyexist.ledmetal50qty = ledmetal50qty),
      (companyexist.ledarm50qty = ledarm50qty),
      (companyexist.lightingsotherqty = lightingsotherqty),
      (companyexist.singlemaxaqty = singlemaxaqty),
      (companyexist.single24maxbqty = single24maxbqty),
      (companyexist.singlesqauremaxqty = singlesqauremaxqty);
    companyexist.singleroundmaxqty = singleroundmaxqty;
    companyexist.single24squaremaxqty = single24squaremaxqty;
    companyexist.single24roundmaxqty = single24roundmaxqty;
    companyexist.singleisolateqty = singleisolateqty;
    companyexist.powerotherqty = powerotherqty;
    companyexist.lighting100qty = lighting100qty;
    companyexist.lighting300qty = lighting300qty;
    companyexist.lightboxqty = lightboxqty;
    companyexist.ledstripqty = ledstripqty;
    companyexist.connectionotherqty = connectionotherqty;

    console.log("Updated Company");
    const updatedCompany = await companyexist.save();

    var mailOptions = {
      from: "hello@nowvue.live",
      to: companyexist.email,
      subject: "Sending Email for Form T3",
      text: "That was easy! Form T3",
      cc: "dolly@montgomeryasia.com",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json(updatedCompany);
  } else {
    const companyexist1 = await FormT3.create({
      userid,
      email,
      led12qty,
      long12qty,
      flourescent40qty,
      ledmetal50qty,
      ledarm50qty,
      lightingsotherqty,
      singlemaxaqty,
      single24maxbqty,
      singlesqauremaxqty,
      singleroundmaxqty,
      single24squaremaxqty,
      single24roundmaxqty,
      singleisolateqty,
      powerotherqty,
      lighting100qty,
      lighting300qty,
      lightboxqty,
      ledstripqty,
      connectionotherqty,
    });

    if (companyexist1) {
      var mailOptions = {
        from: "hello@nowvue.live",
        to: companyexist1.email,
        subject: "Sending Email for Form T3",
        text: "That was easy! T3",
        cc: "dolly@montgomeryasia.com",
      };
      console.log("Created Company");
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json(companyexist1);
    }
  }
};

const FormT3Find = asyncHandler(async (req, res) => {
  console.log("Finding Form T3");
  const { userid } = req.body;
  console.log(userid);
  const companyexist = await FormT3.findOne({ userid });

  if (companyexist) {
    console.log(companyexist);
    console.log("Sending good data");
    res.json(companyexist);
  } else {
    res.json([]);
  }
});

// Form T4
const FormT4CreateOrUpdate = async (req, res) => {
  let {
    id,
    userid,
    email,
    s01qty,
    s02qty,
    s04qty,
    t101qty,
    t101bqty,
    t101wqty,
    t201qty,
    t201bqty,
    t301qty,
    t107aqty,
    c101bqty,
    c105qty,
    c201qty,
    c208qty,
    c208bqty,
    s07qty,
    s08qty,
    s09qty,
    s10qty,
    s11qty,
    s12qty,
    s1275qty,
    s121qty,
    d03qty,
    d07qty,
    m07qty,
    m100qty,
    m100sqty,
    p01qty,
    p02qty,
    p03qty,
  } = req.body;

  const companyexist = await FormT4.findById(id);

  if (companyexist) {
    (companyexist.userid = userid),
      (companyexist.email = email),
      (companyexist.s01qty = s01qty),
      (companyexist.s02qty = s02qty),
      (companyexist.s04qty = s04qty),
      (companyexist.t101qty = t101qty),
      (companyexist.t101bqty = t101bqty),
      (companyexist.t101wqty = t101wqty),
      (companyexist.t201qty = t201qty),
      (companyexist.t201bqty = t201bqty),
      (companyexist.t301qty = t301qty),
      (companyexist.t107aqty = t107aqty),
      (companyexist.c101bqty = c101bqty),
      (companyexist.c105qty = c105qty);
    companyexist.c201qty = c201qty;
    companyexist.c208qty = c208qty;
    companyexist.c208bqty = c208bqty;
    companyexist.s07qty = s07qty;
    companyexist.s08qty = s08qty;
    companyexist.s09qty = s09qty;
    companyexist.s10qty = s10qty;
    companyexist.s11qty = s11qty;
    companyexist.s12qty = s12qty;
    companyexist.s1275qty = s1275qty;
    companyexist.s121qty = s121qty;
    companyexist.d03qty = d03qty;
    companyexist.d07qty = d07qty;
    companyexist.m07qty = m07qty;
    companyexist.m100qty = m100qty;
    companyexist.m100sqty = m100sqty;
    companyexist.p01qty = p01qty;
    companyexist.p02qty = p02qty;
    companyexist.p03qty = p03qty;

    console.log("Updated Company");
    const updatedCompany = await companyexist.save();

    var mailOptions = {
      from: "hello@nowvue.live",
      to: companyexist.email,
      subject: "Sending Email for Form T4",
      text: "That was easy! Form T4",
      cc: "dolly@montgomeryasia.com",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json(updatedCompany);
  } else {
    const companyexist1 = await FormT4.create({
      userid,
      email,
      s01qty,
      s02qty,
      s04qty,
      t101qty,
      t101bqty,
      t101wqty,
      t201qty,
      t201bqty,
      t301qty,
      t107aqty,
      c101bqty,
      c105qty,
      c201qty,
      c208qty,
      c208bqty,
      s07qty,
      s08qty,
      s09qty,
      s10qty,
      s11qty,
      s12qty,
      s1275qty,
      s121qty,
      d03qty,
      d07qty,
      m07qty,
      m100qty,
      m100sqty,
      p01qty,
      p02qty,
      p03qty,
    });

    if (companyexist1) {
      var mailOptions = {
        from: "hello@nowvue.live",
        to: companyexist1.email,
        subject: "Sending Email for Form T4",
        text: "That was easy! T4",
        cc: "dolly@montgomeryasia.com",
      };
      console.log("Created Company");
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json(companyexist1);
    }
  }
};

const FormT4Find = asyncHandler(async (req, res) => {
  console.log("Finding Form T4");
  const { userid } = req.body;
  console.log(userid);
  const companyexist = await FormT4.findOne({ userid });

  if (companyexist) {
    console.log(companyexist);
    console.log("Sending good data");
    res.json(companyexist);
  } else {
    res.json({});
  }
});

// Form T5
const FormT5CreateOrUpdate = async (req, res) => {
  let { id, userid, email, no1qty, no2qty, no3qty } = req.body;

  const companyexist = await FormT5.findById(id);

  if (companyexist) {
    (companyexist.userid = userid),
      (companyexist.email = email),
      (companyexist.no1qty = no1qty),
      (companyexist.no2qty = no2qty),
      (companyexist.no3qty = no3qty),
      console.log("Updated Company");
    const updatedCompany = await companyexist.save();

    var mailOptions = {
      from: "hello@nowvue.live",
      to: companyexist.email,
      subject: "Sending Email for Form T5",
      text: "That was easy! Form T5",
      cc: "dolly@montgomeryasia.com",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json(updatedCompany);
  } else {
    const companyexist1 = await FormT5.create({
      userid,
      email,
      no1qty,
      no2qty,
      no3qty,
    });

    if (companyexist1) {
      var mailOptions = {
        from: "hello@nowvue.live",
        to: companyexist1.email,
        subject: "Sending Email for Form T5",
        text: "That was easy! T5",
        cc: "dolly@montgomeryasia.com",
      };
      console.log("Created Company");
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json(companyexist1);
    }
  }
};

const FormT5Find = asyncHandler(async (req, res) => {
  console.log("Finding Form T5");
  const { userid } = req.body;
  console.log(userid);
  const companyexist = await FormT5.findOne({ userid });

  if (companyexist) {
    console.log(companyexist);
    console.log("Sending good data");
    res.json(companyexist);
  } else {
    res.json({});
  }
});

// Form T6
const FormT6CreateOrUpdate = async (req, res) => {
  let {
    id,
    userid,
    email,
    led32qty,
    led42qty,
    led55qty,
    led65qty,
    uhd70qty,
    uhd79qty,
    uhd84qty,
    tvfloorqty,
    touch32qty,
    touch42qty,
    touch55qty,
    touch65qty,
    videowall47qty,
    videowall55qty,
    p3ledqty,
    videocontrolqty,
    projectorqty,
    tripod6ftqty,
    evzxqty,
    otherqty,
   
  } = req.body;

  const companyexist = await FormT6.findById(id);

  if (companyexist) {
    (companyexist.userid = userid),
      (companyexist.email = email),
      (companyexist.led32qty = led32qty),
      (companyexist.led42qty = led42qty),
      (companyexist.led55qty = led55qty),
      (companyexist.led65qty = led65qty),
      (companyexist.uhd70qty = uhd70qty),
      (companyexist.uhd79qty = uhd79qty),
      (companyexist.uhd84qty = uhd84qty),
      (companyexist.tvfloorqty = tvfloorqty),
      (companyexist.touch32qty = touch32qty),
      (companyexist.touch42qty = touch42qty),
      (companyexist.touch55qty = touch55qty),
      (companyexist.touch65qty = touch65qty),
      (companyexist.videowall47qty = videowall47qty),
      (companyexist.videowall55qty = videowall55qty),
      (companyexist.p3ledqty = p3ledqty),
      (companyexist.videocontrolqty = videocontrolqty),
      (companyexist.projectorqty = projectorqty),
      (companyexist.tripod6ftqty = tripod6ftqty),
      (companyexist.evzxqty = evzxqty),
      (companyexist.otherqty = otherqty),
     
      console.log("Updated Company");
    const updatedCompany = await companyexist.save();

    var mailOptions = {
      from: "hello@nowvue.live",
      to: companyexist.email,
      subject: "Sending Email for Form T6",
      text: "That was easy! Form T6",
      cc: "dolly@montgomeryasia.com",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json(updatedCompany);
  } else {
    const companyexist1 = await FormT6.create({
      userid,
      email,
      led32qty,
      led42qty,
      led55qty,
      led65qty,
      uhd70qty,
      uhd79qty,
      uhd84qty,
      tvfloorqty,
      touch32qty,
      touch42qty,
      touch55qty,
      touch65qty,
      videowall47qty,
      videowall55qty,
      p3ledqty,
      videocontrolqty,
      projectorqty,
      tripod6ftqty,
      evzxqty,
      otherqty,
     
    });

    if (companyexist1) {
      var mailOptions = {
        from: "hello@nowvue.live",
        to: companyexist1.email,
        subject: "Sending Email for Form T6",
        text: "That was easy! T6",
        cc: "dolly@montgomeryasia.com",
      };
      console.log("Created Company");
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json(companyexist1);
    }
  }
};

const FormT6Find = asyncHandler(async (req, res) => {
  console.log("Finding Form T6");
  const { userid } = req.body;
  console.log(userid);
  const companyexist = await FormT6.findOne({ userid });

  if (companyexist) {
    console.log(companyexist);
    console.log("Sending good data");
    res.json(companyexist);
  } else {
    res.json({});
  }
});




// Form T6A
const FormT6ACreateOrUpdate = async (req, res) => {
  let {
    id,
    userid,
    email,
    singletouch32qty,
    multitouch43qty,
    multitouch55qty,
    seamless55qty,
    notebookqty,
    ethernet8qty,
    ethernet16qty,
    ruckusqty,
    cat10mqty,
    cat20mqty,
    provisionqty,
    othersqty,
  } = req.body;

  const companyexist = await FormT6A.findById(id);

  if (companyexist) {
    (companyexist.userid = userid),
      (companyexist.email = email),
      
      (companyexist.singletouch32qty = singletouch32qty),
      (companyexist.multitouch43qty = multitouch43qty),
      (companyexist.multitouch55qty = multitouch55qty),
      (companyexist.seamless55qty = seamless55qty),
      (companyexist.notebookqty = notebookqty),
      (companyexist.ethernet8qty = ethernet8qty),
      (companyexist.ethernet16qty = ethernet16qty),
      (companyexist.ruckusqty = ruckusqty),
      (companyexist.cat10mqty = cat10mqty),
      (companyexist.cat20mqty = cat20mqty),
      (companyexist.provisionqty = provisionqty),
      (companyexist.othersqty = othersqty),
      console.log("Updated Company");
    const updatedCompany = await companyexist.save();

    var mailOptions = {
      from: "hello@nowvue.live",
      to: companyexist.email,
      subject: "Sending Email for Form T6A",
      text: "That was easy! Form T6A",
      cc: "dolly@montgomeryasia.com",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json(updatedCompany);
  } else {
    const companyexist1 = await FormT6A.create({
      userid,
      email,
      
      singletouch32qty,
      multitouch43qty,
      multitouch55qty,
      seamless55qty,
      notebookqty,
      ethernet8qty,
      ethernet16qty,
      ruckusqty,
      cat10mqty,
      cat20mqty,
      provisionqty,
      othersqty,
    });

    if (companyexist1) {
      var mailOptions = {
        from: "hello@nowvue.live",
        to: companyexist1.email,
        subject: "Sending Email for Form T6A",
        text: "That was easy! T6A",
        cc: "dolly@montgomeryasia.com",
      };
      console.log("Created Company");
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json(companyexist1);
    }
  }
};

const FormT6AFind = asyncHandler(async (req, res) => {
  console.log("Finding Form T6");
  const { userid } = req.body;
  console.log(userid);
  const companyexist = await FormT6A.findOne({ userid });

  if (companyexist) {
    console.log(companyexist);
    console.log("Sending good data");
    res.json(companyexist);
  } else {
    res.json({});
  }
});

// Form T7
const FormT7File = async (req, res) => {
  console.log("Req accepted");
  const { id, userid, email } = req.body;
  const userfile = await FormT7.findOne({ userid });
  console.log(userfile);
  if (userfile) {
    console.log(userfile);

    const fileexist = await FormT7.findById(userfile._id);

    if (fileexist) {
      (fileexist.userid = userid),
        (fileexist.email = email),
        (fileexist.formt7file = req.file.originalname);

      console.log("Updated T7 Form file");
      const updatedCompany = await fileexist.save();
      var mailOptions = {
        from: "hello@nowvue.live",
        to: fileexist.email,
        subject: "Sending Email for Form T7",
        text: "That was easy! T7",
        cc: "dolly@montgomeryasia.com",
      };
      console.log("Created Company");
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json(fileexist);
    }
  } else {
    const taskcreate = await FormT7.create({
      userid,
      email,

      formt7file: req.file.originalname,
    });
    if (taskcreate) {
      var mailOptions = {
        from: "hello@nowvue.live",
        to: taskcreate.email,
        subject: "Sending Email for Form T7",
        text: "That was easy! T7",
        cc: "dolly@montgomeryasia.com",
      };
      console.log("Created Company");
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json(taskcreate);
    }
  }
};

const FormT7Find = asyncHandler(async (req, res) => {
  console.log("Finding Form T5");
  const { userid } = req.body;
  console.log(userid);
  const companyexist = await FormT7.findOne({ userid });

  if (companyexist) {
    console.log(companyexist);
    console.log("Sending good data");
    res.json(companyexist);
  } else {
    res.json({});
  }
});

// Form T8
const FormT8CreateOrUpdate = async (req, res) => {
  let {
    id,
    userid,
    email,
    contractorscompanyname,
    nameofPersoninCharge,
    useremail,
    mobileno,
    rows,
  } = req.body;

  const companyexist = await FormT8.findById(id);

  if (companyexist) {
    (companyexist.userid = userid),
      (companyexist.email = email),
      (companyexist.contractorscompanyname = contractorscompanyname),
      (companyexist.nameofPersoninCharge = nameofPersoninCharge),
      (companyexist.useremail = useremail),
      (companyexist.mobileno = mobileno),
      (companyexist.rows = rows),
      console.log("Updated Company");
    const updatedCompany = await companyexist.save();

    var mailOptions = {
      from: "hello@nowvue.live",
      to: companyexist.email,
      subject: "Sending Email for Form T8",
      text: "That was easy! Form T8",
      cc: "dolly@montgomeryasia.com",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json(updatedCompany);
  } else {
    const companyexist1 = await FormT8.create({
      userid,
      email,
      contractorscompanyname,
      nameofPersoninCharge,
      useremail,
      mobileno,
      rows,
    });

    if (companyexist1) {
      var mailOptions = {
        from: "hello@nowvue.live",
        to: companyexist1.email,
        subject: "Sending Email for Form T8",
        text: "That was easy! T8",
        cc: "dolly@montgomeryasia.com",
      };
      console.log("Created Company");
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json(companyexist1);
    }
  }
};

const FormT8Find = asyncHandler(async (req, res) => {
  console.log("Finding Form T8");
  const { userid } = req.body;
  console.log(userid);
  const companyexist = await FormT8.findOne({ userid });

  if (companyexist) {
    console.log(companyexist);
    console.log("Sending good data");
    res.json(companyexist);
  } else {
    res.json({});
  }
});

// Form T8
const FormT9CreateOrUpdate = async (req, res) => {
  let {
    id,
    userid,
    email,
    companyname,
    picname,
    mobile,
    vehiclepermit,
    date,
    useremail,
    vehiclepermit2,
    date2,
  } = req.body;

  const companyexist = await FormT9.findById(id);

  if (companyexist) {
    (companyexist.userid = userid),
      (companyexist.email = email),
      (companyexist.companyname = companyname),
      (companyexist.picname = picname),
      (companyexist.mobile = mobile),
      (companyexist.vehiclepermit = vehiclepermit),
      (companyexist.date = date),
      (companyexist.useremail = useremail),
      (companyexist.vehiclepermit2 = vehiclepermit2),
      (companyexist.date2 = date2),
      console.log("Updated Company");
    const updatedCompany = await companyexist.save();

    var mailOptions = {
      from: "hello@nowvue.live",
      to: companyexist.email,
      subject: "Sending Email for Form T9",
      text: "That was easy! Form T9",
      cc: "dolly@montgomeryasia.com",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json(updatedCompany);
  } else {
    const companyexist1 = await FormT9.create({
      userid,
      email,
      companyname,
      picname,
      mobile,
      vehiclepermit,
      date,
      useremail,
      vehiclepermit2,
      date2,
    });

    if (companyexist1) {
      var mailOptions = {
        from: "hello@nowvue.live",
        to: companyexist.email,
        subject: "Sending Email for Form T9",
        text: "That was easy! T9",
        cc: "dolly@montgomeryasia.com",
      };
      console.log("Created Company");
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json(companyexist1);
    }
  }
};

const FormT9Find = asyncHandler(async (req, res) => {
  console.log("Finding Form T9");
  const { userid } = req.body;
  console.log(userid);
  const companyexist = await FormT9.findOne({ userid });

  if (companyexist) {
    console.log(companyexist);
    console.log("Sending good data");
    res.json(companyexist);
  } else {
    res.json({});
  }
});

module.exports = {
  TaskOneController,
  TaskCreation,
  TaskAllController,
  TaskDeleteController,
  TaskUpdateController,
  TaskClientsController,
  TaskUserController,
  TaskOneUserController,
  TaskOneClientController,
  TaskOpenController,
  TaskClaimUserController,
  TaskChangeStatusController,
  TaskMessagesUpdateController,
  TaskUpdateUsersController,
  TaskExistController,
  TransferTaskController,
  TaskUserTransfer,
  TaskRecurringTask,
  TaskUpdateFileController,
  TaskSendFile,
  ContentAllController,
  ContentDeleteController,
  ProductCreation,
  ProductSendFile,
  ProductAllController,
  OrganizationSendFile,
  OrganizationAllController,
  OrganizationCreation,
  FormT1CreateOrUpdate,
  FormT1Find,
  FormT1ACreateOrUpdate,
  FormT1AFind,
  FormT2CreateOrUpdate,
  FormT2Find,
  FormT3CreateOrUpdate,
  FormT3Find,
  FormT4CreateOrUpdate,
  FormT4Find,
  FormT5CreateOrUpdate,
  FormT5Find,
  FormT6CreateOrUpdate,
  FormT6Find,
  FormT6ACreateOrUpdate,
  FormT6AFind,
  FormT7File,
  FormT7Find,
  FormT8CreateOrUpdate,
  FormT8Find,
  FormT9CreateOrUpdate,
  FormT9Find,
  MBSCreation,
  MBSAllController,
  MBSDeleteController,
  MBSExistController,
  MBSSendFile,
};
