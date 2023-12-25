import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

const ImageGalleryItem = ({ image }) => {
  // Стан для відображення/приховання модального вікна
  const [showModal, setShowModal] = useState(false);

  // Функція для зміни стану відображення модального вікна
  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <>
      <li className={css.item}>
        <img
          className={css.image}
          src={image.webformatURL}
          alt={image.tags}
          onClick={toggleModal}
        />

        {showModal && (
          <Modal
            largeImageURL={image.largeImageURL}
            tags={image.tags}
            onClose={toggleModal}
          />
        )}
      </li>
    </>
  );
};

export default ImageGalleryItem;

// Валідація пропсів для компонента
ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
