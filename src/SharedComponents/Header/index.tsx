import './style.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Core/auth/auth.hook';


const Header: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <nav className='nav__container'>
            <div className='logo nav-logo' onClick={() => navigate('/dashboard')}></div>
            <h1 className='nav_title'>Tennis Lesson Planner</h1>
            <section className='record-logout-buttons__container'>
                <div className='logo record-logo' onClick={() => navigate('/record')}></div>
                <div className='logo logout-logo' onClick={handleLogout}></div>
            </section>
        </nav>
    )
}

export default Header;