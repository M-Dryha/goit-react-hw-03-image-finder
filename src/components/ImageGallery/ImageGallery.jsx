import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ pictures, onClick, showModal }) => {
  return (
    <section>
      <ul className={s.ImageGallery}>
        {pictures.map(({ id, webformatURL, tags }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            tags={tags}
            onClick={onClick}
            showModal={showModal}
          />
        ))}
      </ul>
    </section>
  );
};

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
