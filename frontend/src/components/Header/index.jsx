import React from 'react';
import { logout } from '../../utils/auth';
import { useHistory } from 'react-router-dom';

import { BsFillPersonFill } from 'react-icons/bs';

import './styles.scss';

function Header() {

  const history = useHistory();
  
  const logoutSession = () => {
    logout();
    history.push('/');
  }

  return (
    <div className="header">
      <h2 className="title-main">Main</h2>
      <div className="perfil-icon">
        <BsFillPersonFill />
        <div className="menu">
          <ul>
            <li onClick={logoutSession}>Sair</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;