import { getSession } from "next-auth/react";
import { getUserPosts } from "../../client/request";

export const getServerSideProps = async (ctx) => {
    try {
        const session = await getSession({ req: ctx.req });
        if (session) {
            const response = await getUserPosts({ id: session.user.id });
            return {
                props: {
                    posts: response.body,
                    session
                }
            }
        }
        else {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false
                }
            }
        }
    } catch (error) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
}