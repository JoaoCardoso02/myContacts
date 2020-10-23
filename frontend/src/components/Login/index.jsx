import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../services/user';

import Input from '../../components/Input/index.jsx';
import Button from '../../components/Button/index.jsx';

import { BsArrowLeft } from 'react-icons/bs';

import './styles.scss';

import PropTypes from 'prop-types';

function Login({ changeScreen }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [isNotSuccess, setisNotSuccess] = useState(false)

  const history = useHistory();

  const fields = [
    {
      valueLabel: 'E-mail',
      idName: 'email',
      type: 'email',
      isRequired: true,
      ref: emailRef
    },
    {
      valueLabel: 'Senha',
      idName: 'password',
      type: 'password',
      isRequired: true,
      ref: passwordRef
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valueInput = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    emailRef.current.classList.remove('error');
    passwordRef.current.classList.remove('error');

    if (
      valueInput.email === "" ||
      valueInput.password === ""
    ) {
      setisNotSuccess('Preencha todos os campos!');
    } else {
      const isLoged = await login(valueInput);
      
      if (isLoged) {
        history.push('/main');
      } else {
        setisNotSuccess('E-mail ou senha incorretos!');
      }
    }
  }

  return (
    <>
      <h2 className="title" >Login</h2>
      <form onSubmit={handleSubmit}>
        {fields.map(row => (
          <Input key={row.idName} idName={row.idName} valueLabel={row.valueLabel} type={row.type} required={row.isRequired} inputRef={row.ref} />
        ))}
        <div className="group-buttons">
          <Button divClass="login button-register" type="button" buttonText="Cadastrar" icon={<BsArrowLeft />} onClick={changeScreen} />
          <Button divClass="login button-login" type="submit" buttonText="Login" />
        </div>
      </form>
      { isNotSuccess && <h3 className="textError">{isNotSuccess}</h3> }
    </>
  );
}

Login.propTypes = {
  changeScreen: PropTypes.func,
}

export default Login;