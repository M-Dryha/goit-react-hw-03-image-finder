import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGallery';

const ImageGallery = ({ pictures }) => {
  return (
    <ul className={s.ImageGallery}>
      {pictures.map(({ id, webformatURL }) => (
        <ImageGalleryItem key={id} id={id} webformatURL={webformatURL} />
      ))}
    </ul>
  );
};
export default ImageGallery;
