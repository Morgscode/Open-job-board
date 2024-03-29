const express = require("express");
const multer = require("multer");
const catchAsync = require("../utils/catchAsyncError");
const AppError = require("../utils/AppError");
const roles = require("../middleware/userRoles");
const auth = require("../middleware/authentication");
const controller = require("../controllers/jobApplicationController");

const router = express.Router();
const upload = multer({ dest: `${process.env.UPLOADS_DIR}/cv` });

router.use(catchAsync(auth.protect));
router.use(catchAsync(auth.emailVerified));

router
  .route("/")
  .post(
    catchAsync(roles.jobBoardUser),
    upload.single("cv"),
    controller._create
  );

router.use(catchAsync(roles.jobBoardRecruiter));

router.route("/").get(controller._index);

router.route("/:id/withdraw").put(controller.withdraw);

router
  .route("/:id")
  .get(controller._find)
  .put(controller._update)
  .delete(controller._delete);

router.route("/jobs/:id").get(controller.findByJobId);

router.route("/users/:id").get(controller.findByUserId);

router
  .route("/job-application-statuses/:id")
  .get(controller.findByJobApplicationStatusId);

module.exports = router;
