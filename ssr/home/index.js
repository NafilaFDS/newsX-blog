import { getAllPosts } from "../../client/request"

export const getStaticProps = async (ctx) => {
    const response = await getAllPosts();
    if (!response.hasError) {
        return {
            props: {
                posts: response.body
            },
            revalidate: 5
        }
    } else {
        return {
            props: {
                posts: [],
                res
            }
        }
    }
}