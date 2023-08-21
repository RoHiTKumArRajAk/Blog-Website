import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/user.js';
import Token from '../model/token.js';

dotenv.config();

export const signupUser = async (request,response) => {
    try{
        const hashedPassword = await bcrypt.hash(request.body.password, 10);  // 10 is length of the salt
        const user = { username: request.body.username , name:request.body.name , password:hashedPassword};
        const newUser = new User(user); 
        await newUser.save(); 

        return response.status(200).json({msg:'signup successfully'});
    }catch(err){
        return response.status(500).json({msg:'Error while signup'});
    }
};


export const loginUser = async (request,response) => {
    let user = await User.findOne({ username: request.body.username});
    // console.log(user);
    if(!user){
        return response.status(400).json({ msg:'User Not Found...'});
    }
    try{
        let match = await bcrypt.compare(request.body.password, user.password);
        if(match){
    
            const accessToken = jwt.sign(user.toJSON() , process.env.ACCESS_SECRET_KEY , {expiresIn: '15m'});    //it gets expired almost after 15 mins
            const refreshToken = jwt.sign(user.toJSON() , process.env.REFRESH_SECRET_KEY);    //then requesting another accesstoken with the help of refresh token
            // so we have to store the refresh token so that we can use it further when the access token expires
    
            const newToken = new Token({ token: refreshToken}); 
            await newToken.save();

            return response.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username });  // passing name and username to simplyfy the process because its a long process to get name and username from the access token
             
        }
        else{
            return response.status(400).json({ msg:'Password Does not Match for given Username...'});
        }
    } catch(error) {
        return response.status(500).json({ msg:'Error while logining in User...'});
    }
};