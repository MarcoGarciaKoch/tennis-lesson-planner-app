import './style.css';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Core/auth/auth.hook';
import Multilanguage from '../Multilanguage';
import { useTranslation } from 'react-i18next';
import { HiMenu } from 'react-icons/hi';
import { IoHome, IoFolderOpen } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai'



const Header: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [menuVisible, setMenuVisible] = useState(false);
    const hamburgerBtnRef = useRef(null);
    const [t] = useTranslation('translation');

    useEffect(() => {

        const closeMenu = (e:any) => {
            if(e.path[2] !== hamburgerBtnRef.current) {
                setMenuVisible(false)
            }
        };

        document.body.addEventListener('click', closeMenu)

        return () => document.body.removeEventListener('click', closeMenu);
    },[menuVisible, setMenuVisible])

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <>
            <nav className='nav__container'>
                <div className='menu-hamburguer__container'>
                    <button ref={hamburgerBtnRef} className='hamburguer-button' onClick={() => setMenuVisible(!menuVisible)}>
                        {
                         menuVisible
                         ? <AiOutlineClose color='#ffffffd3' fontSize='24px' />
                         : <HiMenu color='#ffffffd3' fontSize='27px' />
                        }           
                    </button>
                    <div className='logo nav-logo' onClick={() => navigate('/dashboard')}></div>
                </div>
                {/* <h1 className='nav_title' onClick={() => navigate('/dashboard')}>Tennis Lesson Planner</h1> */}
                <section className='languages-logout-buttons__container'>
                    <Multilanguage></Multilanguage>
                    <div className='logo user-logo'></div>
                </section>
            </nav>
            {
                menuVisible && (
                    <menu onBlur={() => setMenuVisible(false)}>
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
        </>
    )
}

export default Header;