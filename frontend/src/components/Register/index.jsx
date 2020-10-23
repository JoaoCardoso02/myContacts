import React, { useRef, useState } from 'react';
import { createUser } from '../../services/user';

import './styles.scss';

import Input from '../../components/Input/index.jsx';
import Button from '../../components/Button/index.jsx';

import { BsArrowRight } from 'react-icons/bs';

import PropTypes from 'prop-types';

function Register({ changeScreen }) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isNotSuccess, setisNotSuccess] = useState(false);

  const fields = [
    {
      valueLabel: 'Nome Completo',
      idName: 'name',
      type: 'text',
      isRequired: true,
      ref: nameRef
    },
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
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    nameRef.current.classList.remove('error');
    emailRef.current.classList.remove('error');
    passwordRef.current.classList.remove('error');
    
    if (
      !valueInput.name ||
      !valueInput.email ||
      !valueInput.password
    ) {
      setisNotSuccess('Preencha todos os campos!');
    } else {
      const sendData = await createUser(valueInput);
      
      if (sendData) {
        setIsSuccess(true);
        setisNotSuccess(false);
      } else {
        setIsSuccess(false);
        setisNotSuccess('E-mail já cadastrado!');
      }
    }
    
  }

  return (
    <>
      <h2 className="title" >Cadastro</h2>
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <Input key={field.idName} idName={field.idName} valueLabel={field.valueLabel} type={field.type} required={field.isRequired} inputRef={field.ref} maxLength={field.maxLength ? field.maxLength : null} minLength={field.minLength ? field.minLength : null}  onChange={field.onChange ? field.onChange : null} />
        ))}
        <div className="group-buttons">
          <Button divClass="register button-register" type="submit" buttonText="Cadastrar" />
          <Button divClass="register button-login" type="button" buttonText="Login" icon={<BsArrowRight />} onClick={changeScreen} />
        </div>
      </form>
      { isSuccess && <h3 className="textSuccess">Conta criada com sucesso!</h3> }
      { isNotSuccess && <h3 className="textError">{isNotSuccess}</h3> }
    </>
  );
}

Register.propTypes = {
  changeScreen: PropTypes.func,
}

export default Register;