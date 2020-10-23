import React, { useEffect, useRef, useState } from 'react';
import { getContacts, updateContact } from '../../services/contacts.js';
import { useDispatch } from 'react-redux';

import Button from '../Button/index.jsx';
import Input from '../Input/index.jsx';

import './styles.scss';

import PropTypes from 'prop-types';

function ModalAlterContact({ clickCancel, idSelected }) {
  const dispatch = useDispatch();
  const nameContactRef = useRef(null);
  const emailRef = useRef(null);
  const foneRef = useRef(null);


  useEffect(() => {
    (async () => {
      const contact = (await getContacts()).filter(contact => contact.id === idSelected)[0];
      setFieldsContact(fieldsContact.map(field => {
        field.defaultValue = contact[field.idName];
        return field;
      }));
    })();
  }, [])

  const [fieldsContact, setFieldsContact] = useState([
    {
      valueLabel: 'Nome Completo',
      idName: 'name',
      type: 'text',
      isRequired: true,
      ref: nameContactRef
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
      type: 'number',
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
  ]);

  const handleAlterContact = async (e) => {
    e.preventDefault();
    const valueInput = {
      name: nameContactRef.current.value,
      email: emailRef.current.value,
      fone: Number(foneRef.current.value),
    };

    if (
      valueInput.name === "" ||
      valueInput.email === "" ||
      valueInput.fone === ""
    ) {
      alert('Preencha todos os campos!');
    } else {
      valueInput.id = idSelected;
      const dataAPI = await updateContact(valueInput);
      
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

  return (
    <div className="modal-alter-contact">
      <h2>Alteração de contato</h2>
      <form onSubmit={handleAlterContact}>
        <div>
          {fieldsContact.map(field => (
            <Input key={field.idName} idName={field.idName} valueLabel={field.valueLabel} type={field.type} required={field.isRequired} inputRef={field.ref} defaultValue={field.defaultValue} />
          ))}
        </div>
        <div className="group-buttons group-buttons-alter-contact">
          <Button divClass="cancel" type="button" buttonText="Cancelar" onClick={clickCancel} />
          <Button divClass="confirm-alter-contact" type="submit" buttonText="Confirmar" />
        </div>
      </form>
    </div>
  );
}

ModalAlterContact.propTypes = {
  clickCancel: PropTypes.func,
  idSelected : PropTypes.number
}

export default ModalAlterContact;