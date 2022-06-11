import Image from 'next/image';

export { getServerSideProps } from '../../../ssr/post-detail';


const PostDetailPage = ({ post }) => {
    console.log("post: ", post);
    return (
        <div className='container'>
            <div className="row">
                <article class="blog-post">
                    <h1 class="blog-post-title mb-1">{post.title}</h1>
                    <p class="blog-post-meta">{post.createdAt} by <a href="#">{post.user.name}</a></p>
                    {/* <Image
                        src={post.image}
                        width={300}
                        height={300}
                    /> */}
                    <div style={{ textAlign: 'center', margin: '50px 0' }}>
                        <img src={post.image} style={{ width: '500px' }} />
                    </div>
                    <p>{post.desc}</p>
                </article>
            </div>

        </div>
    )
}

export default PostDetailPage;