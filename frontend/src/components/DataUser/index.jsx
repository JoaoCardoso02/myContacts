import React, { useEffect, useRef, useState } from 'react';
import { alterDataUser, getUser } from '../../services/user';

import { RiDeleteBin5Line } from 'react-icons/ri';

import Input from '../../components/Input/index.jsx';
import Button from '../../components/Button/index.jsx';

import './styles.scss';

import PropTypes from 'prop-types';

function DataUser({ setModal }) {

  const [users, setUsers] = useState({}) ;

  const [isSuccess, setIsSuccess] = useState(false)
  const [isNotSuccess, setisNotSuccess] = useState(false)

  const nameRef = useRef(null);
  const emailRef = useRef(null);

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
    }
  ];

  const getDataUser = async () => {
    const userLogged = await getUser()
    setUsers(userLogged);

    nameRef.current.value = userLogged.name;
    emailRef.current.value = userLogged.email;
  }

  useEffect(() => {
    (async () => {
      await getDataUser();
    })()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valueInput = {
      name: nameRef.current.value,
      email: emailRef.current.value,
    };

    if (
      !valueInput.name ||
      !valueInput.email
    ) {
      setisNotSuccess('Preencha todos os campos!');
    } else {
      const isUploaded = await alterDataUser(valueInput);
      
      if (typeof isUploaded === 'boolean') {
        await getDataUser();
        
        emailRef.current.classList.remove('error');
      } else {
        const errors = isUploaded;

        emailRef.current.classList.add(errors.email && 'error');
      }
    }
  }


  return (
    <div className="my-data-content">
      <h2 className="title-main">Meus dados <RiDeleteBin5Line onClick={() => setModal('deleteUser')} /></h2>
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <Input key={field.idName} idName={field.idName} valueLabel={field.valueLabel} type={field.type} required={field.isRequired} inputRef={field.ref}  maxLength={field.maxLength ? field.maxLength : null} minLength={field.minLength ? field.minLength : null}  onChange={field.onChange ? field.onChange : null} />
        ))}
        <div className="group-buttons">
          <Button divClass="alterData button-alter-password" type="button" buttonText="Alterar senha" onClick={() => setModal('alterPassword')} />
          <Button divClass="alterData button-finish" type="submit" buttonText="Concluir" />
        </div>
      </form>
      { isSuccess && <h3 className="textSuccess">{isSuccess}</h3> }
      { isNotSuccess && <h3 className="textError">{isNotSuccess}</h3> }
    </div>
  );
}

DataUser.propTypes = {
  setModal: PropTypes.func,
}


export default DataUser;