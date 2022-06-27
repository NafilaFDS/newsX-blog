export { getStaticProps } from '../ssr/home';
import Link from 'next/link';
import styles from '../styles/Home.module.css'

export default function Home({ posts }) {
  console.log("posts: ", posts);
  return (
    <div className={`container`} style={{ marginTop: '20px' }}>
      {
        posts && posts.map((post, index) => (
          <div key={index} className="row">
            <div className="col">
              <article class="blog-post">
                <h2 class="blog-post-title mb-1">{post.title}</h2>
                <p class="blog-post-meta">{post.createdAt} by <a href="#">{post.user?.name}</a></p>
                <p>{post.desc}</p>
                <Link href={`/post/${post._id}/${post.slug}`}>
                  <a>View More</a>
                </Link>
              </article>
            </div>
          </div>
        ))
      }
      {
        posts.length === 0 &&
        <div className="row">
          <div className="col">
            <h1 className="text-center">No Post Available</h1>
          </div>
        </div>
      }

    </div>
  )
}
