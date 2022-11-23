import './style.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Multilanguage from '../Multilanguage';
import NavigationMenu from './Components/NavigationMenu';
import UserConfigMenu from './Components/UserConfigMenu';



const Header: React.FC = () => {
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);
    const [userConfig, seteUserConfig] = useState(false);

    useEffect(() => {
        
        const closeMenu = (e:any) => {
            if(e.path[0].className !== 'hamburguer-button') {
                setMenuVisible(false)
            }
            if (e.path[0].className !== 'user-logo') {
                seteUserConfig(false)
            }
        };

        document.body.addEventListener('click', closeMenu)

        return () => document.body.removeEventListener('click', closeMenu);
    },[])


    return (
        <>
            <nav className='nav__container'>
                <div className='menu-hamburguer__container'>
                    <button className='hamburguer-button' onClick={() => setMenuVisible(!menuVisible)}>
                        {
                            menuVisible
                            ? 'x'
                            : '☰'
                        }           
                    </button>
                    <div className='nav-logo' onClick={() => navigate('/dashboard')}></div>
                </div>
                <section className='languages-logout-buttons__container'>
                    <Multilanguage></Multilanguage>
                    <div className='user-logo' onClick={() => seteUserConfig(!userConfig)}></div>
                </section>
            </nav>
            {
                menuVisible && (
                    <NavigationMenu onClose={() => setMenuVisible(false)} />  
                )
            }
            {
                userConfig && (
                    <UserConfigMenu onClose={() => seteUserConfig(false)} />
                )
            }
        </>
    )
}

export default Header;