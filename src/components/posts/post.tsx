import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {fetchAllMedia, uploadMedia} from "../../store/actions/profile";
import Loader from "../loader";

export default function () {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');
    const {mediaList, loading, error} = useSelector(state => state.root.profileReducers);
    const {userToken, temporaryCredentials} = useSelector(state => state.root.auth);
    const isMediaLoaded = useRef(false);
    useEffect(() => {
        if (!mediaList.length && !isMediaLoaded.current) {
            isMediaLoaded.current = true;
            dispatch(fetchAllMedia({userToken, temporaryCredentials}));
        }
    }, [mediaList]);

    const showAllMedia = () => {
        return  mediaList.map((item,index) => {
                    return <div className="col-md-4 col-sm-6 mb-4" key={index}>
                        <div className="thumbnail">
                            <img src={item.preSignedUrl}
                                 className="img-fluid" alt={item.key}
                                 style={{width: '100%', height: '100px'}}
                            />
                        </div>
                    </div>
                })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(uploadMedia({userToken,file, temporaryCredentials}));
    }
    const onFileSelect = (e) => {
        const input = e.target;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setPreview(e.target.result)
            }
            setFile(input.files[0]);
            reader.readAsDataURL(input.files[0]);
        }
    }

    return <div className="container mt-4 media-list">
        {!!loading && <Loader/>}
        <div className="row">
            <div className="col-md-12">
                <h4>Add Media</h4>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="upload" className="form-label">Select File Here
                        </label>
                        <input type="file" onChange={onFileSelect} id="upload" className="form-control"/>
                    </div>
                    {preview &&
                        <img className="d-block img-thumbnail m-auto mt-3" width={250} height={200} src={preview}
                             alt="preview"/>}
                    <div className="mb-3">
                        <button type="submit" className="btn btn-success">Submit</button>
                    </div>
                    {!!error && <div className="text-danger text-center">
                        {error}
                    </div> }
                </form>
            </div>
            <div className="col-md-12">
                <h4>Media List</h4>
                {
                    mediaList.length ?
                        <div className="row">
                            {showAllMedia()}
                        </div>
                        :
                        <div id="postsList" className="list-group">
                            <div className="list-group-item">No Media Found.</div>
                        </div>
                }
            </div>
        </div>
    </div>
}