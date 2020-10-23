import React, { useCallback, useState } from 'react';
import Register from '../../components/Register/index.jsx';
import Login from '../../components/Login/index.jsx';

import './styles.scss';

function Home() {
  const [isRegisterScreen, setIsRegisterScreen] = useState(true);

  const changeScreen = useCallback(() => setIsRegisterScreen(!isRegisterScreen), [isRegisterScreen]);
  
  return (
    <div className="container-home">
      <div className="div-image">
        <div className="text-welcome">
          <h2>Bem vindo ao myContacts!</h2>
          <p>Aqui você gerencia toda sua lista de contatos</p>
          <div className="line" />
        </div>
      </div>
      <div className="form">
        <div className="content-form">
          {isRegisterScreen ? <Register changeScreen={changeScreen} /> : <Login changeScreen={changeScreen} />}
        </div>
      </div>
    </div>
  );
}

export default Home;