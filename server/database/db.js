import mongoose from 'mongoose';

const connection = async () => {
    const URL="mongodb://127.0.0.1:27017/BlogWebDB";
    try{
        await mongoose.connect(URL,{useNewUrlParser:true});
        console.log("Database Connected Successfully");
    }catch(error){
        console.log("Error while Printing",error);
    }
};

export default connection;