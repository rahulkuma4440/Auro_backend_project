import Post from '../model/post.js';

// Function to create a new post
export const createNewPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);
        await newPost.save();

        res.status(200).json('Post created successfully');
    } catch (err) {
        res.status(500).json(err);
    }
};

// Function to update an existing post
export const modifyPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await Post.findByIdAndUpdate(req.params.id, { $set: req.body });

        res.status(200).json('Post updated successfully');
    } catch (err) {
        res.status(500).json(err);
    }
};

// Function to delete a post
export const removePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await post.delete();

        res.status(200).json('Post deleted successfully');
    } catch (err) {
        res.status(500).json(err);
    }
};

// Function to get a specific post by ID
export const fetchPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Function to retrieve all posts with optional filters
export const fetchAllPosts = async (req, res) => {
    const { username, category } = req.query;
    try {
        let posts;

        if (username) {
            posts = await Post.find({ username });
        } else if (category) {
            posts = await Post.find({ categories: category });
        } else {
            posts = await Post.find({});
        }

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
};
