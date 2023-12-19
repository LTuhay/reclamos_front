/* eslint-disable react/prop-types */
import { useState } from "react";
import { UsersAdminForm } from "./UsersAdminForm.js";

export const UsersAdminModalForm = ({
  setVisibleForm,
  initialUserForm,
  userSelected,
  setUserSelected,
  passForm,
  setPassForm,
  actionRemove,
}) => {
  const handlerCloseForm = () => {
    setVisibleForm(false);
    setUserSelected(initialUserForm);
  };

  return (
    <div className="abrir-modal animacion fadeIn" >
      <div
        className="modal"
        style={{
          display: "block",
        }}
        tabIndex="-1"
      >
        <div className="modal-dialog w-50" role="document"  style={{position: 'fixed', left: '40%', width: '40%'}}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {userSelected.dni !== null ? "Modificar" : "Crear"}
              </h5>
            </div>
            <div className="modal-body" >
              <UsersAdminForm
                userSelected={userSelected}
                setUserSelected={setUserSelected}
                initialUserForm={initialUserForm}
                handlerCloseForm={handlerCloseForm}
                passForm={passForm}
                setPassForm={setPassForm}
                actionRemove={actionRemove}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
