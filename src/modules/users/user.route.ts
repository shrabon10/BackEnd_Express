import { Router,  } from "express";
import { userController } from "./user.controller";

const router = Router()

router.post('/', userController.createUser )
router.get('/', userController.getAllUser  )
router.get('/:id', userController.getSingleUser)
router.put('/:id', userController.UpdateUsers );
router.delete('/:id', userController.DeletedUserFromDB );


export const userRoute = router