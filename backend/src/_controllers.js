import {Post} from "./_models.js";

const setPost = async (req, res) => {

    const post = await Post.create(

    );

    res.status(200).json(post);
}

const getPostAll = async (req,res)=>{
    const posts = Post.findAll();
    res.status(200).json(posts);
}

export {
    setPost,
    getPostAll,
}
