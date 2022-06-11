import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react"
import nc from 'next-connect';
import slugify from 'slugify';
import { staticResourceUrl } from '../../../client/config';
import { dbConnect } from '../../../lib/db-connect'
import Post from '../../../models/post';
import { errorHandler, responseHandler, validateAllOnces } from '../../../utils/common';

// export const config = {
//     api: {
//         bodyParser: false
//     }
// }

const handler = nc({
    onError: (err, req, res, next) => {
        res.status(500).send(err);
    },
    onNoMatch: (err, req, res, next) => {
        res.status(404).send('No match found')
    },
})
    .post(async (req, res) => {

        try {
            const session = await getSession({ req });
            const token = await getToken({ req });
            console.log("session: ", session);
            console.log("token: ", token);
            if (!session) {
                console.log("session not found");
                errorHandler('Access denied', res)
            } else {
                console.log("session found", session);
                const { title, desc, image } = req.body;
                validateAllOnces({ title, desc });
                await dbConnect();
                const userId = session.user.id;
                console.log("userId:", userId);
                const slug = slugify(req.body.title, { remove: /[*+~.()'"!:@]/g });
                const post = new Post({
                    ...req.body,
                    slug,
                    image: image,
                    user: userId,
                });
                const savePost = await post.save();
                if (savePost) {
                    responseHandler(savePost, res);
                } else {
                    errorHandler(savePost, res);
                }
                // res.status(201).json({ body: req.body })
            }
        } catch (error) {
            console.log("catch error:", error);
            errorHandler(error, res)
        }

    })

export default handler;