import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStore } from '../../client/context';
import Loader from '../../components/Loader';
import { getValue } from '../../utils/common';

export { getServerSideProps } from '../../ssr/profile';

const UserPorfilePage = ({ posts, session }) => {
    const router = useRouter();
    const [state,] = useStore();
    const loggedInUser = getValue(state, ['user'], null)
    const user = getValue(session, ['user'], null);

    if (loggedInUser && loggedInUser.authenticating) {
        return <Loader />
    }
    if (!loggedInUser.authenticated) {
        router.replace(`/login`);
        return null;
    }
    return (
        <div className='container'>
            <div className="row">
                <div className="col" style={{ textAlign: 'center', margin: '30px 0' }}>
                    <h3>{user.name}</h3>
                    <p>If you want a content writer please contact with me</p>
                    <h4>Email: {user.email}</h4>
                </div>
                <hr />
            </div>

            {
                posts && posts.map((post, index) => (
                    <div key={index} style={{ display: 'flex', margin: '10px 0' }}>
                        <div style={{ marginRight: '20px' }}>
                            <img src={post.image} style={{ width: '100px', height: '100px' }} alt="" />
                        </div>
                        <div>
                            <div className="user-posts">
                                <h3>{post.title}</h3>
                                <Link href={`/post/${post._id}/${post.slug}`}>
                                    <a style={{ color: 'blue' }}>View More</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}
export default UserPorfilePage;