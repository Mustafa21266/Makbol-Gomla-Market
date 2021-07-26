import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loadUser, clearErrors } from '../../actions/userActions'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'
const UpdateProfile = ( { history } ) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('./images/logo.png')
    // const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const { user, error, isUpdated, loading } = useSelector(state => state.auth)
    const alert = useAlert()
    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if(error){
            alert.error(error)
            dispatch(clearErrors())
          }
        if(isUpdated){
            alert.success('Profile updated successfully!');
            dispatch(loadUser());
            history.push('/me')
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
        //   dispatch(getProductDetails(match.params.id));
    },[dispatch, alert,error, history, isUpdated ])
    async function submitHandler(e){
        e.preventDefault();
        const formData = new FormData();
        formData.set('name',name)
        formData.set('email',email)
        formData.set('avatar',avatar)
        await dispatch(updateProfile(formData));
        alert.success('Profile updated successfully!');
            dispatch(loadUser());
            history.push('/me')
            dispatch({
                type: UPDATE_PROFILE_RESET
        })
    }
    const onChange = e => {
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatar(reader.result)
                    setAvatarPreview(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
            document.getElementsByClassName('custom-file-label')[0].innerHTML = e.target.files[0].name
       
    }

    return (
        <Fragment>
            <MetaData title={'Update Profile'} />
            <div className="row wrapper animate__animated animate__fadeIn">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="images/*"
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={ loading ? true: false}>Update</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProfile
