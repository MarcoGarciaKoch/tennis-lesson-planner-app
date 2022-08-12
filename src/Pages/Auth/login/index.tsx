import './style.css';
import { useNavigate } from 'react-router-dom';
import { LoginUserData } from '../../../Core/auth/auth.model';
import { useAuth } from '../../../Core/auth/auth.hook';
import LoadingSpinner from '../../../SharedComponents/LoadingSpinner';


const Login: React.FC = () => {
    const { isAuth, isLoading, login } = useAuth()
    const navigate = useNavigate();

    if(isAuth) navigate('/dashboard'); // If already registered, it will redirect to Dashboard page

    const handleSubmitRegistration = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user: LoginUserData = {
            email: e.currentTarget.user.value,
            password: e.currentTarget.password.value
        }
        e.currentTarget.reset();
        login(user).then(() => {
            //After login is successfull it will redirect to Dashboard page
            navigate('/dashboard');
        });
    }


    return (
        <main className='login-main__container'>
            <section className='login-title-logo__container'>
                <div className='login-logo'></div>
                <h1 className='login-title'>Tennis Lesson Planner</h1>
            </section>
            <form className='login-form' action="" method='POST' onSubmit={handleSubmitRegistration}>
                <label htmlFor="USER">
                    User email
                    <input type="text" name='user' id='USER' required/>
                </label>
                <label htmlFor="PASSWORD">
                    Password
                    <input type="password" name='password' id='PASSWORD' required/>
                </label>
                <input id='LOGIN' type="submit" value={'LOGIN'} disabled={isLoading} />
            </form>
            <h4 className='login-create-account-link'>
                Don`t you have an account ? Register <span onClick={() => navigate('/register')}>here</span></h4>
            {isLoading ? <LoadingSpinner loading={isLoading}></LoadingSpinner> : ''}
        </main>
    )
}


export default Login;
