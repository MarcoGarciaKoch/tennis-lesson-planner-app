import './style.css';
import { useNavigate } from 'react-router-dom';
import { LoginUserData } from '../../../Core/auth/auth.model';
import { useAuth } from '../../../Core/auth/auth.hook';
import LoadingSpinner from '../../../SharedComponents/LoadingSpinner';
import { useEffect, useState } from 'react';
import { getLoginMessage } from '../../../Core/auth/auth.utils';
import { useTranslation } from 'react-i18next';
import Multilanguage from '../../../SharedComponents/Multilanguage';


const Login: React.FC = () => {
    const { isAuth, isLoading, login } = useAuth()
    const navigate = useNavigate();
    const [isMessageVisible, updateIsMessageVisible] = useState<boolean>(true)
    const [displayedMessageOne, updateDisplayedMessageOne] = useState<string>('');
    const [displayedMessageTwo, updateDisplayedMessageTwo] = useState<string>('');
    const [t] = useTranslation('translation');

    useEffect(() => {
        if(isAuth) navigate('/dashboard'); // If already logged in, it will redirect to Dashboard page
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleSubmitLogin = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user: LoginUserData = {
            email: e.currentTarget.user.value,
            password: e.currentTarget.password.value
        }
        e.currentTarget.reset();
        login(user).then(r => {
            //After login is successfull it will redirect to Dashboard page
            if(r.status === 201) {
                navigate('/dashboard');
            }else {
                const message = getLoginMessage(r.status)!;
                updateIsMessageVisible(true);
                updateDisplayedMessageOne(message.messageOne);
                updateDisplayedMessageTwo(message.messageTwo);
            }
        });
    }


    return (
        <main className='login-main__container'>
            <section className='login-title-logo__container'>
                <div className='login-logo'></div>
                <h1 className='login-title'>Tennis Lesson Planner</h1>
            </section>
            <section className={`login-message__container ${isMessageVisible ? 'login-message-visible' : ''}`}>
                <p>{displayedMessageOne}</p>
                <p>{displayedMessageTwo}</p>
            </section>
            <form className='login-form' action="" method='POST' onSubmit={handleSubmitLogin}>
                <label htmlFor="USER">
                    {t('specific.login.email')}
                    <input type="text" name='user' id='USER' required/>
                </label>
                <label htmlFor="PASSWORD">
                    {t('specific.login.password')}
                    <input type="password" name='password' id='PASSWORD' required/>
                </label>
                <input id='LOGIN' type="submit" value={t('specific.login.button')} disabled={isLoading} />
            </form>
            <h4 className='login-create-account-link'>
                {t('specific.login.account')} <span onClick={() => navigate('/register')}>{t('specific.login.here')}</span>
            </h4>
            <Multilanguage></Multilanguage>
            {isLoading ? <LoadingSpinner loading={isLoading}></LoadingSpinner> : ''}
        </main>
    )
}


export default Login;
