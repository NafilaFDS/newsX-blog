import { useState } from 'react';
import { createPost } from '../../../client/request';
import styles from './style.module.css'

const PostCreatePage = () => {

    const [image, setImage] = useState(null)
    const [imageInput, setImageInput] = useState(null)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImageInput(file);
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            setImage(e.target.result)
        }
        fileReader.readAsDataURL(file);
    }
    const handleFormData = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('title', title);
        form.append('description', description);
        form.append('image', imageInput);
        console.log("form", form);
        const result = await createPost(form);
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
                        {image && <img src={image} style={{ width: '100px' }} alt="" />}
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