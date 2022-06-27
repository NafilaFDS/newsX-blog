import { dbConnect } from "../../../lib/db-connect";
import Post from "../../../models/post";
import { errorHandler, responseHandler } from "../../../utils/common";

export default async function handler(req, res) {
    try {
        await dbConnect();
        const posts = await Post.find({}).select('_id title desc image slug createdAt')
            .populate('user', 'name')
            .exec();
        console.log("posts:: ", posts);
        if (posts) {
            responseHandler(posts, res);
        }
        else {
            errorHandler('Something went wrong', res);
        }
    } catch (error) {
        console.log("error:: ", error);
        errorHandler(error, res)
    }
}