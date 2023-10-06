import { useNavigate } from 'react-router-dom';
import logOutIcon from '../../assets/exit.png';
import './Header.css';

const Header = () => {
  // логика logOut можно было бы вынести в отдельный компонент,
  // но <Header/> получился небольшим и чтобы вам по файлам меньше прыгать, оставил тут.
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className='header'>
      <span className='header-title'>Сводка</span>
      <div>
        <img
          src={logOutIcon}
          className='logout-icon'
          alt='Logout'
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Header;
