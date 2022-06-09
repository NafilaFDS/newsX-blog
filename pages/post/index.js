
export const getStaticProps = () => {
    return {
        props: {
            name: 'Zihadul Islam'
        },
    }
}

const Post = ({ name }) => {
    return (
        <>
            <p>Post by {name}</p>
        </>
    )
}
export default Post; 