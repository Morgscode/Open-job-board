const express = require('express');
const auth = require('../utils/auth');
const controller = require('../controllers/salaryTypeController');
const catchAsync = require('../utils/catchAsyncError');
const AppError = require('../utils/AppError');

const router = express.Router();

router.route('/')
.get(controller._index);

router.route('/:id')
.get(controller._find);

router.route('/jobs/:id')
.get(controller.findByJobId);

router.use(catchAsync(auth.protect));
router.use(catchAsync(auth.emailVerified));
router.use(catchAsync(auth.jobBoardRecruiter));

router.route('/')
.post(controller._create);

router.route('/:id')
.put(controller._update)
.delete(controller._delete);
 
module.exports = router;