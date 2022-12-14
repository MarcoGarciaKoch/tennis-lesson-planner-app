import './style.css';
import { useNavigate } from 'react-router-dom';
import { RegisterUserData, ResendValidationEmail, DisplayedMessage } from '../../../Core/auth/auth.model';
import { useState } from 'react';
import LoadingSpinner from '../../../SharedComponents/LoadingSpinner';
import { useAuth } from '../../../Core/auth/auth.hook';
import { getRegistrationMessage } from '../../../Core/auth/auth.utils';
import { useTranslation } from 'react-i18next';
import Multilanguage from '../../../SharedComponents/Multilanguage';


const Register: React.FC = () => {
    const navigate = useNavigate();
    const [isMessageVisible, updateIsMessageVisible] = useState<boolean>(false)
    const [isResendVisible, updateIsResendVisible] = useState<boolean>(false);
    const [displayedMessageOne, updateDisplayedMessageOne] = useState<string>('');
    const [displayedMessageTwo, updateDisplayedMessageTwo] = useState<string>('');
    const { register, resendValidationEmail, isLoading } = useAuth();
    const [t] = useTranslation('translation');


    // Function that collects the user data to register and passes it to the register function of the custom hook.
    // Based on the outcome, it displays the correspondent message to inform the user.
    const handleSubmitRegistration = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user: RegisterUserData = {
            name: e.currentTarget.username.value,
            lastname: e.currentTarget.lastname.value,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value
        }
        e.currentTarget.reset();
        register(user).then(r => {
            const message = getRegistrationMessage(r.status)!;
            displayErrorMessage(message);
        });
    }


    // Function that resends the validation email when the user requires it, by providing the email address.
    // Based on the outcome, it displays the correspondent message to inform the user. 
    const handleResendEmail = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user: ResendValidationEmail = {
            email: e.currentTarget.resendEmail.value
        };
        e.currentTarget.reset();
        resendValidationEmail(user).then(r => {
            const message = getRegistrationMessage(r.status)!;
            displayErrorMessage(message);
        })
    }


    //Function that handles the display of the message to inform the user 
    //if the action taken was successfull or the was any error.
    const displayErrorMessage = (message:DisplayedMessage) => {
        updateIsMessageVisible(true);
        updateDisplayedMessageOne(message.messageOne);
        updateDisplayedMessageTwo(message.messageTwo);
    }



    return (
        <main className='register-main__container'>
            <section className='register-title-logo__container'>
                <div className='register-logo'></div>
                <h1 className='register-title'>Tennis Lesson Planner</h1>
                <Multilanguage></Multilanguage>
            </section>
            <section className={`register-massage__container ${isMessageVisible ? 'register-message-visible' : ''}`}>
                <p>{displayedMessageOne}</p>
                <p>{displayedMessageTwo}</p>
            </section>

            <form className='register-form' onSubmit={handleSubmitRegistration}>
                <label htmlFor="NAME">
                    {t('specific.register.name')}
                    <input type="text" name='username' id='NAME' required/>
                </label>
                <label htmlFor="LASTNAME">
                    {t('specific.register.lastname')}
                    <input type="text" name='lastname' id='LASTNAME' required/>
                </label>
                <label htmlFor="EMAIL">
                    {t('specific.register.email')}
                    <input type="email" name='email' id='EMAIL' required/>
                </label>
                <label htmlFor="PASSWORD">
                    {t('specific.register.password')}
                    <input type="password" name='password' id='PASSWORD' required/>
                </label>
                <input id='REGISTER' type="submit" value={t('specific.register.register-button')} disabled={isLoading} />
            </form>

            <section className='back-login-resend-email__container'>
            <h4 className='register-back-login-link'>
                {t('specific.register.back')} <span onClick={() => navigate('/login')}>Login</span></h4>
            {isLoading ? <LoadingSpinner loading={isLoading}></LoadingSpinner> : ''}
            <h4 className='resend-email__title'>
                {t('specific.register.re-send')} 
                {t('specific.register.click')} <span onClick={() => updateIsResendVisible(true)}> {t('specific.register.here')}</span>
            </h4>
            <form 
                className={`resend-email__form ${isResendVisible ? 'resend-visble' : ''}`} 
                onSubmit={handleResendEmail}>
                    <label>
                        {t('specific.register.re-write')}
                        <input type='email' name='resendEmail' required/>
                    </label>
                    <input id='RESEND' type="submit" value={t('specific.register.re-send-button')} disabled={isLoading} />
            </form>
            </section>
        </main>
    )
}


export default Register;