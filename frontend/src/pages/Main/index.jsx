import React, { useState } from 'react';
import { blockBody, enableBody } from '../../utils/utils.js';

import Modal from '../../components/Modal/index.jsx';
import ModalAlterPassword from '../../components/ModalAlterPassword/index.jsx';
import ModalDeleteContact from '../../components/ModalDeleteContact/index.jsx';
import ModalAlterContact from '../../components/ModalAlterContact/index.jsx';
import ModalCreateContact from '../../components/ModalCreateContact/index.jsx';
import ModalDeleteUser from '../../components/ModalDeleteUser/index.jsx';

import Header from '../../components/Header/index.jsx';
import DataUser from '../../components/DataUser/index.jsx';
import ListContacts from '../../components/ListContacts/index.jsx';

import './styles.scss';

function Main() {

  const [modal, setModal] = useState(false);
  const [idSelected, setIdSelected] = useState(false);


  const openModalDelete = (id) => {
    setIdSelected(id);
    setModal('delete');
    blockBody();
  }

  const openModalAlterContact = (id) => {
    setIdSelected(id);
    setModal('alterContact');
    blockBody();
  }

  const clickCancel = () => { setModal(false); setIdSelected(false); enableBody() };

  return (
    <>
      <div className="container-main">
        <Header />
        <div className="content">
          <div className="my-data">
            <DataUser setModal={(value) => { blockBody(); setModal(value); }} />
          </div>
          <div className="list-contacts">
            <ListContacts
              openModalAlterContact={(id) => openModalAlterContact(id)}
              openModalDelete={(id) => openModalDelete(id)} 
              openModalCreateContact={() => { blockBody(); setModal('createContact') }} />
          </div>
        </div>
      </div>
      {modal === 'delete' && 
      <Modal borderColor='#d94d4d'>
        <ModalDeleteContact
          clickCancel={clickCancel}
          idSelected={idSelected}
        />
      </Modal>}

      {modal === 'alterContact' && 
      <Modal borderColor='#2db92d'>
        <ModalAlterContact
          clickCancel={clickCancel}
          idSelected={idSelected}
        />
      </Modal>}

      {modal === 'alterPassword' && 
      <Modal borderColor='#2db92d'>
        <ModalAlterPassword
          clickCancel={clickCancel}
        />
      </Modal>}

      {modal === 'createContact' && 
      <Modal borderColor='#2db92d'>
        <ModalCreateContact
          clickCancel={clickCancel}
        />
      </Modal>}

      {modal === 'deleteUser' && 
      <Modal borderColor='#d94d4d'>
        <ModalDeleteUser
          clickCancel={clickCancel}
        />
      </Modal>}

    </>
  );
}

export default Main;