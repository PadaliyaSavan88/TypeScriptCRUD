import { Request, Response } from 'express'
import { authentication, random } from '../helpers'
import { createUser, getUserByEmail } from '../models/users.model'


export const login = async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body
        if (!email || !password) throw ('Parameter Missing')
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')
        if (!user) throw ('User does not exists')
        const expectedHash = authentication(user.authentication.salt, password)
        if (user.authentication.password !== expectedHash) throw ('Authentication Failed')
        const salt = random()
        user.authentication.sessionToken = authentication(salt, user._id.toString())
        await user.save()
        response.cookie('AUTH-TOKEN', user.authentication.sessionToken, {domain: 'localhost', path: '/'})
        return response.status(200).json({success: true, user})
    } catch (error) {
        console.log(error)
        return response.status(400).json({ success: false, error })
    }
}

export const register = async (request: Request, response: Response) => {
    try {
        const { email, username, password } = request.body
        if (!email || !password || !username) throw ('parameter missing')
        const existingUser = await getUserByEmail(email)
        if (existingUser) throw ('Email Already Registered')
        const salt = random()
        const user = await createUser({
            email, username, authentication: {
                password: authentication(salt, password), salt
            }
        })
        return response.json({ success: true, user })
    } catch (error) {
        console.log(error)
        return response.json({ success: false, error })
    }
}