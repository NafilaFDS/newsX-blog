import { useState } from 'react';
import { createPost } from '../../../client/request';
import styles from './style.module.css'
import axios from 'axios'
const PostCreatePage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState(null);

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
        console.log("result===", result)
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
        </div>
    )
}

export default PostCreatePage;