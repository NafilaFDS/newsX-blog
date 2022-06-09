import { useRouter } from 'next/router';

export const getStaticPaths = () => {
    return {
        paths: [
            {
                params: {
                    postId: '5',
                }
            }
        ],
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {
    const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`);
    const post = await data.json();
    return {
        props: {
            post: post || null
        }
    }
}

const PostDetails = ({ post }) => {
    const router = useRouter();
    const { postId } = router.query;
    return (
        <>
            <p>Post Details page - {post.id}</p>
            <p>{post.title}</p>
            <p>{post.body}</p>
        </>
    )
}
export default PostDetails; 