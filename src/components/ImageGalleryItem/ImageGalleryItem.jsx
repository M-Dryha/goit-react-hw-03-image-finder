const ImageGalleryItem = ({ webformatURL, id, tags }) => {
  return (
    <li>
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
