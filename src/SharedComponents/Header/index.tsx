import './style.css';
import { useNavigate } from 'react-router-dom';


const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <nav className='nav__container'>
            <div className='logo nav-logo' onClick={() => navigate('/')}></div>
            <h1 className='nav_title'>Coach Manager</h1>
            <section className='record-logout-buttons__container'>
                <div className='logo record-logo' onClick={() => navigate('/record')}></div>
                <div className='logo logout-logo'></div>
            </section>
        </nav>
    )
}

export default Header;