import React, { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ largeImageURL, tags, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
        // Закриваємо модальне вікно при натисканні клавіші Escape
      }
    };

    // Додаємо обробник подій при монтажі компонента
    window.addEventListener('keydown', handleKeyDown);

    // Прибираємо обробник подій при розмонтажі компонента
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  // Використовуємо [onClose] як залежність, щоб ефект перезапускався при зміні onClose

  // Дії при кліці на зображення в модальному вікні
  const handleImageClick = e => {
    e.stopPropagation();
    // Зупиняємо подальше вспливання подій
  };

  return (
    <>
      <div className={css.overlay} onClick={onClose}>
        <div className={`${css.modal} ${css.close}`} onClick={handleImageClick}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
