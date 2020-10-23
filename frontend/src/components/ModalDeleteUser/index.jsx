import React from 'react';
import { logout } from '../../utils/auth.js';
import { deleteUser } from '../../services/user.js';
import { useHistory } from 'react-router-dom';

import Button from '../Button/index.jsx';

import './styles.scss';

import PropTypes from 'prop-types';

function ModalDeleteUser({ clickCancel }) {
  
  const history = useHistory();


  const handleDelete = async (e) => {
    e.preventDefault();

    await deleteUser();

    clickCancel();
    logout();
    history.push('/');

  }

  return (
    <div className="modal-delete">
      <h2>Você tem certeza que quer deletar sua conta?</h2>
      <form className="group-buttons group-buttons-delete" onSubmit={handleDelete}>
        <Button divClass="cancel" type="button" buttonText="Cancelar" onClick={clickCancel} />
        <Button divClass="delete" type="submit" buttonText="Confirmar" />
      </form>
    </div>
  );
}

ModalDeleteUser.propTypes = {
  clickCancel: PropTypes.func
}

export default ModalDeleteUser;