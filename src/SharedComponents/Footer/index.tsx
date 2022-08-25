import './style.css';
import { useNavigate } from 'react-router-dom';



const Footer: React.FC = () => {
    const navigate = useNavigate();

    return (
        <footer className='footer__container'>
            <section className='name-github__container'>
                <h4 className='footer_name'>@Marco Garcia Koch - 2022</h4>
                <div className='github-info__container'>
                    <div className='github-logo'></div>
                    <h4>Check the GitHub repository <a className='github-link' rel="noopener noreferrer" target="_blank" href="https://github.com/MarcoGarciaKoch/kanban-board">here</a></h4>
                </div>
            </section>
            <h4 className='footer-attributions' onClick={() => navigate('/attributions')}>Attributions</h4>
        </footer>
    )
}


export default Footer;