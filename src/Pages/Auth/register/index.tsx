import './style.css';
import { useNavigate } from 'react-router-dom';
import { RegisterUserData } from '../../../Core/auth/auth.model';
import { useState } from 'react';
import LoadingSpinner from '../../../SharedComponents/LoadingSpinner';
import { useAuth } from '../../../Core/auth/auth.hook';




const Register: React.FC = () => {
    const navigate = useNavigate();
    const [isEmailMessageSent, updateIsEmailMessageSent] = useState<boolean>(false);
    const { register, isLoading } = useAuth();


    // Function that collects the user data to register and passes it to the register function of the custom hook.
    const handleSubmitRegistration = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user: RegisterUserData = {
            name: e.currentTarget.username.value,
            lastname: e.currentTarget.lastname.value,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value
        }
        e.currentTarget.reset();
        register(user).then(() => updateIsEmailMessageSent(true));
    }

    return (
        <main className='register-main__container'>
            <section className='register-title-logo__container'>
                <div className='register-logo'></div>
                <h1 className='register-title'>Tennis Lesson Planner</h1>
            </section>
            <section className={`email-sent-massage__container ${isEmailMessageSent ? 'message-visible' : 'message-non-visible'}`}>
                <p>We have sent you an email to validate your account.</p>
                <p>Please check your mailbox.</p>
            </section>
            <form className='register-form' onSubmit={handleSubmitRegistration}>
                <label htmlFor="NAME">
                    Name
                    <input type="text" name='username' id='NAME' required/>
                </label>
                <label htmlFor="LASTNAME">
                    Lastname
                    <input type="text" name='lastname' id='LASTNAME' required/>
                </label>
                <label htmlFor="EMAIL">
                    Email
                    <input type="email" name='email' id='EMAIL' required/>
                </label>
                <label htmlFor="PASSWORD">
                    Password
                    <input type="password" name='password' id='PASSWORD' required/>
                </label>
                <input id='LOGIN' type="submit" value={'REGISTER'} disabled={isLoading} />
            </form>
            <h4 className='register-back-login-link'>
                Back to <span onClick={() => navigate('/login')}>Login</span></h4>
            {isLoading ? <LoadingSpinner loading={isLoading}></LoadingSpinner> : ''}
        </main>
    )
}


export default Register;