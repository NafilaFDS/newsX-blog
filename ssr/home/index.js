import { getAllPosts } from "../../client/request"

export const getStaticProps = async (ctx) => {
    const response = await getAllPosts();
    console.log("get all post: ", response);
    if (response && response.body.length) {
        return {
            props: {
                posts: response.body
            },
            revalidate: false
        }
    } else {
        return {
            props: {
                posts: [],
                response
            }
        }
    }
}