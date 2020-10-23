import React, { useRef } from 'react';
import { alterPassword } from '../../services/user.js';

import Button from '../Button/index.jsx';
import Input from '../Input/index.jsx';

import './styles.scss';

import PropTypes from 'prop-types';

function ModalAlterPassword({ clickCancel }) {

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const oldPasswordRef = useRef(null);

  const handleAlterPassword = async (e) => {
    e.preventDefault();

    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const oldPassword = oldPasswordRef.current.value;

    if (password === confirmPassword) {
      const passwordAltered = await alterPassword({ password: oldPassword, newPassword: password });
      
      if (passwordAltered) {
        oldPasswordRef.current.classList.remove('error');
        passwordRef.current.classList.remove('error');
        confirmPasswordRef.current.classList.remove('error');

        clickCancel();
      } else {
        oldPasswordRef.current.classList.add('error');
      }
    } else {
      passwordRef.current.classList.add('error');
      confirmPasswordRef.current.classList.add('error');
    }
  }

  const fieldsAlterPassword = [
    {
      valueLabel: 'Senha antiga',
      idName: 'oldPassword',
      type: 'password',
      isRequired: true,
      ref: oldPasswordRef
    },
    {
      valueLabel: 'Senha',
      idName: 'password',
      type: 'password',
      isRequired: true,
      ref: passwordRef
    },
    {
      valueLabel: 'Confirme a senha',
      idName: 'confirmpassword',
      type: 'password',
      isRequired: true,
      ref: confirmPasswordRef
    }
  ];

  return (
    <div className="modal-alter-password">
      <h2>Alteração de senha</h2>
      <form onSubmit={handleAlterPassword}>
        <div>
          {fieldsAlterPassword.map(field => (
            <Input key={field.idName} idName={field.idName} valueLabel={field.valueLabel} type={field.type} required={field.isRequired} inputRef={field.ref} />
          ))}
        </div>
        <div className="group-buttons group-buttons-alter-password">
          <Button divClass="cancel" type="button" buttonText="Cancelar" onClick={clickCancel} />
          <Button divClass="confirm-alter-password" type="submit" buttonText="Confirmar" />
        </div>
      </form>
    </div>
  );
}

ModalAlterPassword.propTypes = {
  clickCancel: PropTypes.func,
}

export default ModalAlterPassword;