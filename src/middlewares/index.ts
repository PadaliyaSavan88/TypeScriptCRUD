import { NextFunction, Request, Response } from 'express'
import { get, merge } from 'lodash'

import {getUserBySessionToken} from '../models/users.model'

export const isOwner = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {id} = request.params
        const currentUser = get(request, 'identity._id') as string
        if(!currentUser || currentUser.toString() !== id) throw('Not Authorized')
        next()
    } catch (error) {
        console.log(error)
        response.status(400).json({success: false, error})
    }
}

export const isAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const sessionToken = request.cookies['AUTH-TOKEN']
        if(!sessionToken) throw('Authentication Failed')
        const existingUser = await getUserBySessionToken(sessionToken)
        if(!existingUser) throw ('Authentication Failes')
        merge(request, {identity: existingUser})
        return next()
    } catch (error) {
        console.log(error)
        response.status(400).json({success: false, error})
    }
}