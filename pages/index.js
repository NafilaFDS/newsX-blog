export { getStaticProps } from '../ssr/home';
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
                <p class="blog-post-meta">{post.createdAt} by <a href="#">Mark</a></p>
                <p>{post.desc}</p>
              </article>
            </div>
          </div>
        ))
      }

    </div>
  )
}
