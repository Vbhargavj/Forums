import { useEffect, useContext } from 'react';
import { AddDiscussion } from './pages/AddDiscussion';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { SignIn } from './pages/SingIn';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import axios from 'axios';
import { AuthContext } from './Context/AuthContext'
import mainUrl from './utils/constant';
import { useNavigate } from 'react-router-dom';
import { ForumPage } from './pages/ForumPage';
import { AddTag } from './pages/AddTag';
import Profile from './pages/Profile';
import  AdminPanel from './pages/Admin/AdminPanel';

axios.defaults.withCredentials = true

function App() {


    return (
        // <ForumPage></ForumPage>
        <Routes>
            <Route path="/" element={<IsLogin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path="/add-discussion" element={<AddDiscussion />} />
            <Route path="/add-tag" element={<AddTag />} />
            <Route path="/forum/:id" element={< ForumPage />} />
            <Route path="/profile" element={< Profile />} />
            <Route path="/admin" element={< AdminPanel/>}/>
        </Routes>
    );
}

export default App;


const IsLogin = () => {
    const { setAuth, setUserDetails } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${mainUrl}/api/v1/user/isLogin`)
            .then(response => {
                console.log('API response:', response.data);
                setAuth(response.data.loggedIn);
                if (response.data.loggedIn) {
                    console.log('Setting user details:', response.data.user);
                    setUserDetails(response.data.user); // Ensure this is an object
                    navigate('/home');
                } else {
                    navigate('/login');
                }
            })
            .catch(error => {
                console.error('API error:', error);
                navigate('/login');
            });
    }, [setAuth, setUserDetails, navigate]);

    return null;
};

