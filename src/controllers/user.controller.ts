import { Request, Response } from 'express'
import { deleteUserById, getUserById, getUsers } from '../models/users.model'

export const getAllUsers = async (request: Request, response: Response) => {
    try {
        const users = await getUsers();
        return response.status(200).json({success: true, users})
    } catch (error) {
        console.log(error)
        return response.status(400).json({success: false, error})
    }
}

export const deleteUser = async(request: Request, response: Response) => {
    try {
        const {id} = request.params
        const deleteUser = await deleteUserById(id)

        return response.status(200).json({success: true, deleteUser})
    } catch (error) {
        console.log(error)
        return response.status(400).json({success: false, error})
    }
}

export const updateUser = async(request: Request, response: Response) => {
    try {
        const {id} = request.params
        const {username} = request.body
        if(!username) throw('Parameters Missing')
        const user = await getUserById(id)
        if(!user) throw('User Not Found')
        user.username = username
        await user.save()
        return response.status(200).json({success: true, user})
    } catch (error) {
        console.log(error)
        return response.status(400).json({success: false, error})
    }
}