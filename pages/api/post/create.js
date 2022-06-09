import multer from 'multer';
import nc from 'next-connect';
import slugify from 'slugify';
import { staticResourceUrl } from '../../../client/config';
import { dbConnect } from '../../../lib/db-connect'
import Post from '../../../models/post';
import { errorHandler, responseHandler, validateAllOnces } from '../../../utils/common';

export const config = {
    api: {
        bodyParser: false
    }
}

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        // destination: function (req, file, cb) {
        //     cb(null, 'public/uploads');
        // },
        // destination: function (req, file, cb) {
        //     cb(null, path.join(process.cwd(), "public", "uploads"));
        // },
        filename: function (req, file, cb) {
            cb(null, new Date().getTime() + "-" + file.originalname);
        },
    }),
});

const handler = nc({
    onError: (err, req, res, next) => {
        res.status(500).send(err);
    },
    onNoMatch: (err, req, res, next) => {
        res.status(404).send('No match found')
    },
})
    .use(upload.single('image'))
    .post((req, res) => {
        res.status(201).json({ body: req.body, file: req.file })
        // try {
        //     const session = await getSession({ req });
        //     if (!session) {
        //         errorHandler('Access denied', res)
        //     } else {
        //         const { title, desc } = req.body;
        //         validateAllOnces({ title, desc });
        //         await dbConnect();
        //         const userId = session.user.id;
        //         const url = staticResourceUrl + req.file.filename
        //         const slug = slugify(req.body.title, { remove: /[*+~.()'"!:@]/g });
        //         const post = new Post({
        //             ...req.body,
        //             slug,
        //             image: url,
        //             user: userId,
        //         });
        //         const savePost = await post.save();
        //         if (savePost) {
        //             responseHandler(savePost, res);
        //         } else {
        //             errorHandler(savePost, res);
        //         }
        //         // res.status(201).json({ body: req.body })
        //     }
        // } catch (error) {
        //     errorHandler(error, res)
        // }

    })

export default handler;