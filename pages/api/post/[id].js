import Post from "../../../models/post";
import { errorHandler, responseHandler } from "../../../utils/common";

export default async function handler(req, res) {
    try {
        const { id } = req.query;
        const post = await Post.findOne({ _id: id })
            .select('_id title desc image slug user createdAt')
            .populate('user', '_id name')
            .exec();

        if (post) {
            responseHandler(post, res)
        } else {
            errorHandler('Something went wrong', res, 404)
        }
    } catch (error) {
        errorHandler(error, res)
    }
}