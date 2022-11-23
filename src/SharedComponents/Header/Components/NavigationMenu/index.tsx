import './style.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoHome, IoFolderOpen, IoInformationCircleSharp } from 'react-icons/io5';
import { BsFillQuestionDiamondFill } from 'react-icons/bs';

const NavigationMenu: React.FC<{onClose:() => void}> = ({onClose}) => {
    const navigate = useNavigate();
    const [t] = useTranslation('translation');

    return (
        <div className='navigation-menu__wrapper'>
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
                    <li>
                        <IoInformationCircleSharp color='#ffffffd3' fontSize='18px' />
                        <div>{t('general.header.about')}</div>
                    </li>
                    <li>
                        <BsFillQuestionDiamondFill color='#ffffffd3' fontSize='18px' />
                        <div>{t('general.header.faqs')}</div>
                    </li>
                </ul>
            </menu>
        </div>
        
    )
}


export default NavigationMenu