const express =require("express")
const router = express.Router()
const {loginUser, registerUser, verifyEmail, changePassword, resetPassword, forgotPassword} = require('../controllers/authController')
const {requireAuthAndAuthorization} = require("../middlewares/requireAuth")

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/verify/:verificationCode', verifyEmail);
router.put('/:id/changepassword', requireAuthAndAuthorization ,changePassword)// Route for resetting password
router.post('/reset-password/:resetToken', resetPassword);
router.post('/forgot-password', forgotPassword);


module.exports = router