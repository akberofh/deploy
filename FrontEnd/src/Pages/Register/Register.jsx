import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Register.module.css';
import { useRegisterMutation } from "../../Redux/Slice/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../Redux/Slice/authSlice";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [photo, setPhoto] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector(state => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/dashboard');
        }
    }, [navigate, userInfo]);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            if (photo) {
                formData.append('photo', photo);
            }

            const res = await register(formData).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/dashboard');
        } catch (error) {
            toast.error('Registration failed');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setPhoto(acceptedFiles[0]);
        }
    });

    const handleClearUploadPhoto = () => {
        setPhoto(null);
    };

    return (
        <section className={styles.container}>
            <div className={styles.auth}>
                <h1>REGISTER</h1>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="photo">Photo:</label>
                        <div {...getRootProps({ className: 'dropzone' })} className="h-14 bg-gray-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
                            <input {...getInputProps()} />
                            <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                                {photo ? photo.name : (isDragActive ? "Drop the files here..." : "Drag 'n' drop some files here, or click to select files")}
                            </p>
                            {photo && (
                                <button type="button" className="text-lg ml-2 hover:text-red-600" onClick={handleClearUploadPhoto}>
                                    <IoClose />
                                </button>
                            )}
                        </div>
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Creating User' : 'Register'}
                    </button>
                </form>
                <p className={styles.loginmessage} onClick={() => navigate('/login')}>
                    <span>Login</span>
                </p>
            </div>
        </section>
    );
};

export default Register;
