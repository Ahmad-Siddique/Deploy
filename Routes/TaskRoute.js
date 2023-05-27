
const TaskControllers = require("../Controllers/TaskController");
const express = require("express");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // callback(null, "../app/frontend/build/uploads");
     callback(null, "./uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


router.post("/api/taskregister",upload.single('taskfile'), TaskControllers.TaskCreation);
router.get("/api/alltasks", TaskControllers.TaskAllController);
router.post("/api/deletetasks/:id", TaskControllers.TaskDeleteController);
router.post(
  "/api/updatetasks/:id",
  
  TaskControllers.TaskUpdateController
);

router.post("/api/updatetaskfile/:id", upload.single("taskfile"), TaskControllers.TaskUpdateFileController);
router.get("/api/onetask/:id", TaskControllers.TaskOneController);
router.get("/api/taskclients", TaskControllers.TaskClientsController);
router.get("/api/taskusers", TaskControllers.TaskUserController);
router.get("/api/taskoneuser/:id", TaskControllers.TaskOneUserController);
router.get("/api/taskoneclient/:id", TaskControllers.TaskOneClientController);
router.get("/api/taskopen", TaskControllers.TaskOpenController);
router.post("/api/claimtask/:id", TaskControllers.TaskClaimUserController);
router.post(
  "/api/updatestatus/:id",
  TaskControllers.TaskChangeStatusController
);
router.post(
  "/api/updatemessage/:id",
  TaskControllers.TaskMessagesUpdateController
);
router.post("/api/updateusers/:id", TaskControllers.TaskUpdateUsersController);
router.post("/api/taskexist", TaskControllers.TaskExistController);
router.post("/api/transfertask/:id", TaskControllers.TransferTaskController);
router.get("/api/usertransfertask/:id", TaskControllers.TaskUserTransfer);
router.get("/api/taskrecurring", TaskControllers.TaskRecurringTask);
router.get("/api/sendfile/:id", TaskControllers.TaskSendFile);
router.get("/api/allcontent", TaskControllers.ContentAllController);
router.post("/api/deletecontent/:id", TaskControllers.ContentDeleteController);





// Organization
router.post(
  "/api/createorganization",
  upload.single("organizationimage"),
  TaskControllers.OrganizationCreation
);
router.get("/api/allorganization", TaskControllers.OrganizationAllController);
router.get("/api/sendorganizationimage/:id", TaskControllers.OrganizationSendFile);


// Product
router.post("/api/createproduct",upload.single("productimage"),TaskControllers.ProductCreation);
router.get("/api/allproducts", TaskControllers.ProductAllController);
router.get("/api/sendproductimage/:id", TaskControllers.ProductSendFile);


// Form T1
router.post("/api/formt1a", TaskControllers.FormT1CreateOrUpdate)
router.post("/api/formt1single", TaskControllers.FormT1Find);

// Form T1A
router.post(
  "/api/formt1aa",
  upload.single("installationfile"),
  TaskControllers.FormT1ACreateOrUpdate
);
router.post("/api/formt1aasingle", TaskControllers.FormT1AFind);


// Form T2
router.post("/api/formt2", TaskControllers.FormT2CreateOrUpdate)
router.post("/api/formt2single", TaskControllers.FormT2Find);


// Form T3
router.post("/api/formt3", TaskControllers.FormT3CreateOrUpdate)
router.post("/api/formt3single", TaskControllers.FormT3Find);



// Form T4
router.post("/api/formt4", TaskControllers.FormT4CreateOrUpdate)
router.post("/api/formt4single", TaskControllers.FormT4Find);

// Form T5
router.post("/api/formt5", TaskControllers.FormT5CreateOrUpdate)
router.post("/api/formt5single", TaskControllers.FormT5Find);


// Form T6
router.post("/api/formt6", TaskControllers.FormT6CreateOrUpdate)
router.post("/api/formt6single", TaskControllers.FormT6Find);

// Form T6A
router.post("/api/formt6a", TaskControllers.FormT6ACreateOrUpdate)
router.post("/api/formt6singlea", TaskControllers.FormT6AFind);


// Form T7
router.post(
  "/api/formt7file",
  upload.single("formt7file"),
  TaskControllers.FormT7File
);
router.post("/api/formt7single", TaskControllers.FormT7Find);


// Form T8
router.post("/api/formt8", TaskControllers.FormT8CreateOrUpdate)
router.post("/api/formt8single", TaskControllers.FormT8Find);


// Form T9
router.post("/api/formt9", TaskControllers.FormT9CreateOrUpdate)
router.post("/api/formt9single", TaskControllers.FormT9Find);


// MBS Forms
router.post(
  "/api/mbsregister",
  upload.single("MBSfile"),
  TaskControllers.MBSCreation
);
router.get("/api/allmbs", TaskControllers.MBSAllController);
router.post("/api/deletembs/:id", TaskControllers.MBSDeleteController);
router.post("/api/mbsexist", TaskControllers.MBSExistController);
router.get("/api/sendmbsfile/:id", TaskControllers.MBSSendFile);

module.exports = router;