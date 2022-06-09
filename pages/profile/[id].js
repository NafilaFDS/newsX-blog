export const getServerSideProps = async ({ query }) => {
    const data = await fetch(`https://jsonplaceholder.typicode.com/users/${query.id}`);
    const user = await data.json();

    return {
        props: {
            user: user || null
        }
    }
}

const Profile = ({ user }) => {
    return (
        <>
            <p>Profile</p>
            <p>{user.name}</p>
        </>
    )
}

export default Profile;