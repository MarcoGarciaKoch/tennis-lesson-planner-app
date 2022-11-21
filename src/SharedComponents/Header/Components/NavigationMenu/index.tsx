import './style.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../../Core/auth/auth.hook';
import { IoHome, IoFolderOpen } from 'react-icons/io5';

const NavigationMenu: React.FC<{onClose:() => void}> = ({onClose}) => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [t] = useTranslation('translation');

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <menu onClick={onClose}>
            <ul>
                <li>
                    <IoHome color='#ffffffd3' fontSize='18px' />
                    <div onClick={() => navigate('/dashboard')}>{t('general.header.home')}</div>
                </li>
                <li>
                    <IoFolderOpen color='#ffffffd3' fontSize='18px' />
                    <div onClick={() => navigate('/record')}>{t('general.header.record')}</div>
                </li>
            </ul>
            <section className='logout__container'>
                {t('general.header.logout')}  
                <div className='logo logout-logo' onClick={handleLogout}></div>
            </section>
        </menu>
    )
}


export default NavigationMenu