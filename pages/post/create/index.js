import { useState } from 'react';
import { createPost } from '../../../client/request';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './style.module.css'
import axios from 'axios'
import { useStore } from '../../../client/context';
import { getValue } from '../../../utils/common';
import { useRouter } from 'next/router';
import Loader from '../../../components/Loader';
const PostCreatePage = () => {
    const router = useRouter();
    const [state,] = useStore();
    const user = getValue(state, ['user'], null)

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const handleImage = (event) => {
        const imageData = new FormData()
        imageData.set('key', 'bcaa76da5c37cf7520b24da6b76c88ea');
        imageData.append('image', event.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(res => {
                console.log(res);
                console.log(res?.data?.data?.display_url)
                setImageURL(res?.data?.data?.display_url)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleFormData = async (e) => {
        e.preventDefault();
        const input = {
            title,
            desc: description,
            image: imageURL
        }
        const result = await createPost(input);
        if (result.hasError) {
            setErrorMessage(result.errorMessage)
            toast.error(result.errorMessage)
        } else {
            setTitle('');
            setDescription('');
            setImageURL('');
            router.push('/')
        }
    }


    if (user && user.authenticating) {
        return <Loader />
    }
    if (!user.authenticated) {
        router.replace(`/login`);
        return null;
    }

    return (
        <div className={`container ${styles['post-create']}`}>
            <div className="row">
                <div className="col">
                    <h2>Create News</h2>
                </div>
            </div>
            <form onSubmit={handleFormData}>
                <div className='row'>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingPoint"
                            placeholder="Enter Title"
                            value={title}
                            onChange={e => { setTitle(e.target.value) }}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className="col">
                        <textarea
                            type="text"
                            className="form-control"
                            id="floatingPoint"
                            placeholder="Enter Description"
                            value={description}
                            onChange={e => { setDescription(e.target.value) }}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className="col">
                        <input
                            type="file"
                            accept='image/*'
                            className="form-control"
                            id="floatingPoint"
                            onChange={handleImage}
                        />
                    </div>
                    <div className="col">
                        {/* {image && <img src={image} style={{ width: '100px' }} alt="" />} */}
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <button>submit</button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default PostCreatePage;