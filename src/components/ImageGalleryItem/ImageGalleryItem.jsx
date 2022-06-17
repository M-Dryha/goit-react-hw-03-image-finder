import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  webformatURL,
  tags,
  onClick,
  id,
  onClose,
  toggleModal,
}) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        id={id}
        className={s.ImageGalleryItemImage}
        onClick={() => {
          onClick(id);
          console.log(id);
          toggleModal();
        }}
        onClose={() => {
          onClose();
        }}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func,
  toggleModal: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
