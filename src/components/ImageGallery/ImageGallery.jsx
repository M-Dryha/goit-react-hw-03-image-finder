import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ pictures }) => {
  return (
    <ul className={s.ImageGallery}>
      {pictures.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          webformatURL={webformatURL}
          tags={tags}
        />
      ))}
    </ul>
  );
};
export default ImageGallery;
