import './style.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Core/auth/auth.hook';
import Multilanguage from '../Multilanguage';

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
            <h1 className='nav_title' onClick={() => navigate('/dashboard')}>Tennis Lesson Planner</h1>
            <section className='languages-logout-buttons__container'>
                <Multilanguage></Multilanguage>
                <div className='logo logout-logo' onClick={handleLogout}></div>
            </section>
        </nav>
    )
}

export default Header;