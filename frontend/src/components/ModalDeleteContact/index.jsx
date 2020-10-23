import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact, getContacts } from '../../services/contacts.js';

import Button from '../Button/index.jsx';

import './styles.scss';

import PropTypes from 'prop-types';

function ModalDeleteContact({ clickCancel, idSelected }) {
  const dispatch = useDispatch();


  const handleDelete = async (e) => {
    e.preventDefault();

    const isDeleted = await deleteContact(idSelected);

    if (isDeleted) {

      const contactsAPI = await getContacts();
      dispatch({ type: 'ADD_NEW_LIST', payload: contactsAPI });
    }
    clickCancel();

  }

  return (
    <div className="modal-delete">
      <h2>Você tem certeza que quer deletá-lo?</h2>
      <form className="group-buttons group-buttons-delete" onSubmit={handleDelete}>
        <Button divClass="cancel" type="button" buttonText="Cancelar" onClick={clickCancel} />
        <Button divClass="delete" type="submit" buttonText="Confirmar" />
      </form>
    </div>
  );
}

ModalDeleteContact.propTypes = {
  clickCancel: PropTypes.func,
  idSelect: PropTypes.number,
}

export default ModalDeleteContact;