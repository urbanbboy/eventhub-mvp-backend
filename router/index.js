import { Router } from 'express';
import { body } from 'express-validator';
import UserController from '../controllers/user-controller.js'
import authMiddleware from '../middleware/auth-middleware.js';
import CategoryController from '../controllers/category-controller.js';
import upload from "../middleware/upload-middleware.js";
import ContractorController from '../controllers/contractor-controller.js';

export const router = new Router();

// user
router.post('/login',
    body('email').isEmail(), 
    body('password').isLength({ min: 3, max: 32 }),
    UserController.login
);
router.post('/register', UserController.register);
router.post('/logout', UserController.logout);
router.post('/refresh', UserController.refresh);
router.put("/user", authMiddleware, UserController.updateUser);


// category (organizer)
router.get('/categories', CategoryController.getCategoryList);
router.post('/category', upload.single("image"), CategoryController.createCategory);

// contractors
router.get('/contractors', ContractorController.getContractorList)
router.post('/contractor', upload.single("avatar"), ContractorController.createContractor)