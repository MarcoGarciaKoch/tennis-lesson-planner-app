import './style.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../Core/auth/auth.hook';
import { useEffect } from 'react';
import LoadingSpinner from '../../../SharedComponents/LoadingSpinner';


const Validate: React.FC = () => {
    const { isAuth, isLoading, accountValidated, validate} = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    if(isAuth) navigate("/"); // if already autheticated, it will redirect to login page

    useEffect(() => {
        validate(searchParams.get('token')?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchParams])
    
    return (
        <main className='validate-main__container'>
            {isLoading ? <LoadingSpinner loading={isLoading}></LoadingSpinner> :
                <>
                    { accountValidated ?
                        <>
                        <h1>Congrats! Your account has been validated successfully!!</h1>
                        <div className='gif validation__gif'></div>
                        <h4 className='validate-back-login-link'>
                            Go to <span onClick={() => navigate('/login')}>Login</span></h4>
                        </>
                    :
                        <>
                        <h1>Oppps! Something went wrong and we could not validate your account</h1>
                        <div className='gif not-validation__gif'></div>
                        <h4>Please try again later</h4>
                        </>
                    }
                </>
            }
        </main>
    )
}


export default Validate;