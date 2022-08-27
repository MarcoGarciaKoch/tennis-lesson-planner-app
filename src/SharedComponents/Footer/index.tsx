import './style.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



const Footer: React.FC = () => {
    const navigate = useNavigate();
    const [t] = useTranslation('translation');

    return (
        <footer className='footer__container'>
            <section className='name-github__container'>
                <h4 className='footer_name'>@Marco Garcia Koch - 2022</h4>
                <div className='github-info__container'>
                    <div className='github-logo'></div>
                    <h4>{t('general.footer.github')} <a className='github-link' rel="noopener noreferrer" target="_blank" href="https://github.com/MarcoGarciaKoch/tennis-lesson-planner-app">{t('general.footer.here')}</a></h4>
                </div>
            </section>
            <h4 className='footer-attributions' onClick={() => navigate('/attributions')}>{t('general.footer.attributions')}</h4>
        </footer>
    )
}


export default Footer;