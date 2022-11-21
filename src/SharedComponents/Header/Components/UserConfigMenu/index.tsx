import './style.css';
import { useTranslation } from 'react-i18next';
import { IoSettings } from 'react-icons/io5';

const UserConfigMenu: React.FC<{onClose:() => void}> = ({onClose}) => {
    const [t] = useTranslation('translation');


    return (
        <menu className='user-config__container' onClick={onClose}>
            <ul>
                <li>
                    <div>Working progress..</div>
                </li>
                <li>
                    <IoSettings color='#ffffffd3' fontSize='18px' />
                    <div>{t('general.header.settings')}</div>
                </li>
            </ul>
        </menu>
    )
}


export default UserConfigMenu;