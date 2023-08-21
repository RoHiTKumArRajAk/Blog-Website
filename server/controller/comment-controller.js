import Comment from '../model/comment.js';

export const newComment = async (request, response) => {
    try {
        const comment = await new Comment(request.body);
        comment.save();

        response.status(200).json('Comment saved Successfully');
    } catch (error) {
        response.status(500).json({error:error.message});
    }
}


export const getComments = async (request, response) => {
    let id = request.query.id;
    try {
        const comments = await Comment.find({ postId: id });  //here post id is the the id of that post
        
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json({error:error.message});
    }
}

export const deleteComment = async (request, response) => {
    let id = request.query.id;
    // console.log(id);
    try {
        const comment = await Comment.findById(id);
        // console.log(comment);
        if (!comment) {
            response.status(404).json({ msg: 'Comment not Found' });
        }
        await Comment.findByIdAndDelete(id);
        response.status(200).json('Comment Deleted Successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}