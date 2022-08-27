import './style.css';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import translationES from '../../assets/languages/es/translation.json';
import translationEN from '../../assets/languages/en/translation.json';


i18n
    .use(initReactI18next) // passess i18n down to react-i18next
    .init({
        resources: {
            en: { translation: translationEN},
            es: { translation: translationES}
        },
        lng: "es",
        fallbackLng: "es",
        interpolation: { escapeValue: false}
    });


const Multilanguage: React.FC = () => {
    const [, i18n] = useTranslation('translation');

    return (
        <section className='languages__container'>
            <div className='flags spain-flag' onClick={() => i18n.changeLanguage("es")}></div>
            <div className='flags uk-flag' onClick={() => i18n.changeLanguage("en")}></div>
        </section>
    )
}


export default Multilanguage;