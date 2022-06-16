import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, onClick, id }) => {
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
        }}
      />
    </li>
  );
};

export default ImageGalleryItem;
