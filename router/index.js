import { Router } from 'express';
import { body } from 'express-validator';
import UserController from '../controllers/user-controller.js'
import TaskController from '../controllers/task-controller.js'
import BoardController from '../controllers/board-controller.js';
import authMiddleware from '../middleware/auth-middleware.js';
import ColumnController from '../controllers/column-controller.js';

export const router = new Router();

// user
router.post('/login',
    body('email').isEmail(), 
    body('password').isLength({ min: 3, max: 32 }),
    UserController.login
);
router.post('/register', UserController.register);
router.post('/register/invite', UserController.inviteRegister)
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.post('/refresh', UserController.refresh);
router.put("/user", authMiddleware, UserController.updateUser)
