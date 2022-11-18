import './style.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Core/auth/auth.hook';
import Multilanguage from '../Multilanguage';
import { HiMenu } from 'react-icons/hi';
import { IoHome, IoFolderOpen } from 'react-icons/io5';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [menuVisible, setMenuVisible] = useState(false);


    // useEffect(() => {

    //     const closeMenu = (e:MouseEvent | TouchEvent) => {
    //         console.log(e)
    //         setMenuVisible(false)
    //     }

    //     document.body.addEventListener('click', closeMenu)

    //     return () => document.body.removeEventListener('click', closeMenu);
    // },[])

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <>
            <nav className='nav__container'>
                <div className='menu-hamburguer__container'>
                    <HiMenu color='#ffffffd3' fontSize='27px' onClick={() => setMenuVisible(prev => !prev)} />
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
                                <div onClick={() => navigate('/dashboard')}>Home</div>
                            </li>
                            <li>
                                <IoFolderOpen color='#ffffffd3' fontSize='18px' />
                                <div onClick={() => navigate('/record')}>Historial</div>
                            </li>
                        </ul>
                        <section className='logout__container'>
                            Cerrar Sesión  
                            <div className='logo logout-logo' onClick={handleLogout}></div>
                        </section>
                    </menu>
                )
            }
        </>
    )
}

export default Header;