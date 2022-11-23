import './style.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../Core/auth/auth.hook';
import { useTranslation } from 'react-i18next';
import { IoSettings } from 'react-icons/io5';
import { FaUserEdit } from 'react-icons/fa'

const UserConfigMenu: React.FC<{onClose:() => void}> = ({onClose}) => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [t] = useTranslation('translation');

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <div className='user-config__wrapper'>
            <menu className='user-config__container' onClick={onClose}>
                <ul>
                    <li>
                        <FaUserEdit color='#ffffffd3' fontSize='18px' />
                        <div>{t('general.header.profile')}</div>
                    </li>
                    <li>
                        <IoSettings color='#ffffffd3' fontSize='18px' />
                        <div>{t('general.header.settings')}</div>
                    </li>
                </ul>
                <section className='logout__container'>
                    {t('general.header.logout')}  
                    <div className='logo logout-logo' onClick={handleLogout}></div>
                </section>
            </menu>
        </div>
    )
}


export default UserConfigMenu;