import Post from '../model/post.js';

export const createPost = async (request, response) => {
    try{
        const post = await new Post(request.body);
        post.save();

        return response.status(200).json('Post Saved Successfully');
    }catch(error){
        return response.status(500).json(error);
    }
};

export const getAllPosts = async (request , response) => {
    let category = request.query.category;
    let posts;
    try{
        if(category){
            posts = await Post.find({categories:category});    // sorting according to the category and passing only that
        }
        else{
            posts = await Post.find({});
        }

        return response.status(200).json(posts);
    }catch(error){
        return response.status(500).json({ msg:error.message});
    }
};

export const getPost = async (request , response) => {
    let id = request.query.id;
    try{
        // const post = await Post.findById(request.params.id);
        const post = await Post.findById(id);
        return response.status(200).json(post);

    }catch(error){
        console.log("Error in Getting Post by Id")
        return response.status(500).json({msg: error.message});
    }
};

export const updatePost = async (request, response) => {
    let id = request.body._id;
    try {
        const post = await Post.findById(id);
        // console.log(post);
        // console.log(request.body);
        if (!post) {
            response.status(404).json({ msg: 'Post not Found' });
        }
        const pp = await Post.findByIdAndUpdate( id, { $set: request.body });
        response.status(200).json('Post Updated Successfully');
    } catch (error) {
        return response.status(500).json({msg: error.message});
    }
}

export const deletePost = async (request, response) => {
    let id = request.query.id;
    // console.log(id);
    try {
        const post = await Post.findById(id);
        // console.log(post);
        if (!post) {
            response.status(404).json({ msg: 'Post not Found' });
        }
        
        await Post.findByIdAndDelete(id);
        response.status(200).json('Post Deleted Successfully');

    } catch (error) {
        return response.status(500).json({msg: error.message});
    }
}