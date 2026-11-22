import type { Request, Response } from "express";
import { pool } from "../../db";
import { userSercie } from "./user.service";
import type { Iuser } from "./user.interface";


const createUser = async(req : Request, res: Response)=>{
    // console.log(req.body);
   try {
    const result = await userSercie.createUserIntoDB(req.body)
     
    console.log(result);
    res.status(201).json({
        success: true,
        message: "Users Created!!!",
        data: result.rows[0]
    })
    
   } catch (error: any) {
    res.status(500).json({
        success: false,
        message: error?.message,
        error: error
    })
   }
}


const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userSercie.getAllUsersFromDB();

        res.status(200).json({
            success: true,
            message: "Users Retrieved Successfully!",
            data: result.rows
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        });
    }
};


const getSingleUser = async(req : Request, res: Response)=>{
    try {
        const {id} = req.params
        const result = await userSercie.getSingleUserFromDB(id as string );
        console.log(result);
        res.status(201).json({
        success: true,
        message: "Users Created!!!",
        data: result.rows[0]
    })
        
    } catch (error: any) {
    res.status(500).json({
        success: false,
        message: error?.message,
        error: error
    })
    }
}


const UpdateUsers = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await userSercie.UpdateUserFromDB(
            req.body,
            id as string
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Updated Successfully!",
            data: result.rows[0]
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        });
    }
};


const DeletedUserFromDB = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await userSercie.DeletUsersFromDB(id as string)

        // Check if user exists
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: result.rows[0]
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        });
    }
}




export const userController ={
    createUser,
    getAllUser,
    getSingleUser,
    UpdateUsers,
DeletedUserFromDB 
}