import React from 'react';
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [cardName, setCardName] = React.useState('');
    const [cardLink, setCardLink] = React.useState('');

    function handleCardNameChange(e) {
        setCardName(e.target.value);
    }
    function handleCardLinkChange(e) {
        setCardLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: cardName,
            link: cardLink
        });

        setCardName('');
        setCardLink('');
    }

    return(
        <PopupWithForm
            name="card"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <>
                <input
                    className="popup__input popup__input_name"
                    type="text"
                    name="name"
                    id="name-card"
                    placeholder="Название"
                    required
                    value={cardName}
                    minLength="1"
                    maxLength="30"
                    onChange={handleCardNameChange}
                />
                <span
                    className="popup__input-error"
                    id="name-card-error">
                    </span>
                <input
                    className="popup__input popup__input_title"
                    type="URL"
                    name="link"
                    id="link-card"
                    placeholder="Ссылка на картинку"
                    required
                    value={cardLink}
                    onChange={handleCardLinkChange}
                />
                <span
                    className="popup__input-error"
                    id="link-card-error"
                >
                    </span>
                <button
                    type="submit"
                    className="popup__save-btn popup__create-card"
                    onClick={onClose}
                >
                        <span
                            className="popup__create-card"
                        >
                            Создать
                        </span>
                </button>
            </>
        </PopupWithForm>
    )
}

export default AddPlacePopup;