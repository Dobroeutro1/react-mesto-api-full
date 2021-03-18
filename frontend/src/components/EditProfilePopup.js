import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onClose();
    onUpdateUser({
      name,
      about: description,
    });
  }
  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          className="popup__input popup__input_name"
          type="text"
          name="name"
          id="name-profile"
          value={name}
          required
          minLength="2"
          maxLength="40"
          onChange={handleNameChange}
        />
        <span className="popup__input-error" id="name-profile-error"></span>
        <input
          className="popup__input popup__input_title"
          type="text"
          name="link"
          id="about-profile"
          value={description}
          required
          minLength="2"
          maxLength="200"
          onChange={handleDescriptionChange}
        />
        <span className="popup__input-error" id="about-profile-error"></span>
        <button type="submit" className="popup__save-btn popup__save-profile">
          <span>Сохранить</span>
        </button>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
