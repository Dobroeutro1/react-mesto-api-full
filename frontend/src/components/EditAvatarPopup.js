import React from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const userAvatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onClose();

    onUpdateAvatar({
      avatar: userAvatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="update"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          className="popup__input popup__input_title"
          type="URL"
          name="link"
          id="link-popup"
          placeholder="Ссылка на картинку"
          required
          ref={userAvatarRef}
        />
        <span className="popup__input-error" id="link-popup-error"></span>
        <button type="submit" className="popup__save-btn popup__save-profile">
          <span>Сохранить</span>
        </button>
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
