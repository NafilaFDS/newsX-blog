import { getSinglePost } from "../../client/request";

export const getServerSideProps = async (ctx) => {
    const { query } = ctx;
    const response = await getSinglePost(query.id);
    if (!response.hasError) {
        return {
            props: {
                post: response.body
            }
        }
    } else {
        return {
            props: {
                post: null,
            }
        }
    }
}