import React, { useRef } from 'react';
import { createContact, getContacts } from '../../services/contacts.js';
import { useDispatch } from 'react-redux';

import Button from '../Button/index.jsx';
import Input from '../Input/index.jsx';

import './styles.scss';

import PropTypes from 'prop-types';

function ModalCreateContact({ clickCancel }) {
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const foneRef = useRef(null);

  const handleCreateContact = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const fone = foneRef.current.value;

    if (name && email && fone) {
      const dataAPI = await createContact({name, email, fone});
      if (typeof dataAPI === 'boolean') {

        const contactsAPI = await getContacts();
        dispatch({ type: 'ADD_NEW_LIST', payload: await contactsAPI });

        clickCancel();
      } else {
        const errors = dataAPI;

        emailRef.current.classList.remove(!errors.email && 'error');
        foneRef.current.classList.remove(!errors.fone && 'error');

        emailRef.current.classList.add(errors.email && 'error');
        foneRef.current.classList.add(errors.fone && 'error');
      }
    }
  }

  const fieldsCreateContact = [
    {
      valueLabel: 'Nome',
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
      valueLabel: 'Telefone',
      idName: 'fone',
      type: 'text',
      isRequired: true,
      ref: foneRef,
      onChange: (input) => {
        const value = input.target.value;
        if (!Number(value) || (Number(value) && value.length > 11)) {
          let newValue = value.split('');
          delete newValue[value.length - 1];
          newValue = newValue.toString().replaceAll(',', '')
          input.target.value = newValue;
        }
      }
    }
  ];

  return (
    <div className="modal-create-contact">
      <h2>Criação de contato</h2>
      <form onSubmit={handleCreateContact}>
        <div>
          {fieldsCreateContact.map(field => (
            <Input key={field.idName} idName={field.idName} valueLabel={field.valueLabel} type={field.type} required={field.isRequired} inputRef={field.ref} defaultValue={field.defaultValue} onChange={field.onChange ? field.onChange : null} />
          ))}
        </div>
        <div className="group-buttons group-buttons-create-contact">
          <Button divClass="cancel" type="button" buttonText="Cancelar" onClick={clickCancel} />
          <Button divClass="confirm-create-contact" type="submit" buttonText="Confirmar" />
        </div>
      </form>
    </div>
  );
}

ModalCreateContact.propTypes = {
  clickCancel: PropTypes.func,
}

export default ModalCreateContact;