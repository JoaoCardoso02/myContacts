import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../services/contacts';

import { RiDeleteBin5Line, RiPencilLine } from 'react-icons/ri';
import { BsPlusCircle } from 'react-icons/bs';

import './styles.scss';


import PropTypes from 'prop-types';

function ListContacts({ openModalAlterContact, openModalDelete, openModalCreateContact }) {

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  useEffect(() => {
    (async () => {

      const contactsAPI = await getContacts();
      dispatch({ type: 'ADD_NEW_LIST', payload: await contactsAPI });
    })();
  }, []);
  
  return (
    <div className="list-contacts-content">
      <h2 className="title-main">Meus contatos <BsPlusCircle onClick={openModalCreateContact} /></h2>
      <div className="list">
        <ul>
          <li className="li-title">
            <div className="div-titles">
              <h3>Nome</h3>
              <h3>E-mail</h3>
              <h3>Telefone</h3>
            </div>
          </li>
          {contacts.map((contact, index) => (
            <li className='li-data' key={index}>
              <div className="data-contact-list">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
                <p>{contact.fone}</p>
              </div>
              <div className="options">
                <RiPencilLine className="pencil" onClick={() => openModalAlterContact(contact.id)}/>
                <RiDeleteBin5Line onClick={() => openModalDelete(contact.id)} className="delete" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

ListContacts.propTypes = {
  openModalAlterContact: PropTypes.func,
  openModalDelete: PropTypes.func,
  openModalCreateContact: PropTypes.func,
}


export default ListContacts;