import React, { Component } from 'react';
import { Audio } from 'react-loader-spinner';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import GetPicture from '../../API';
import Button from '../Button';

class ImageGallery extends Component {
  state = {
    pictures: [],
    page: 1,
    status: 'idle',
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.setState({ pictures: [], status: 'pending' });
      this.fetchPicture();
    }
    if (prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });
      this.fetchPicture();
    }
  }
  fetchPicture = async () => {
    try {
      const newPicture = await GetPicture(this.props.value, this.state.page);
      const { pictures } = this.state;
      this.setState(state => ({
        // query: values.name,
        status: 'resolved',
        pictures: [...pictures, ...newPicture.hits],
      }));
      window.scrollBy({
        top: document.body.clientHeight,
        behavior: 'smooth',
      });
    } catch (error) {
      this.setState(state => ({ error, status: 'rejected' }));
      console.log(this.state.status);
    }
  };

  loadMore = () => {
    // const onButtonClick = e.target;
    // const { page } = this.state;
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
    console.log(this.state.page);
  };

  render() {
    const { status } = this.state;

    if (status === 'pending') {
      return (
        <div className={s.Loader}>
          <Audio height="100" width="100" color="blue" ariaLabel="loading" />
        </div>
      );
    }

    // if (status === 'rejected') {
    //   return <div>oops</div>;
    // }
    return (
      <section>
        <ul className={s.ImageGallery}>
          {this.props.values}
          {this.state.pictures.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              webformatURL={webformatURL}
              tags={tags}
            />
          ))}
        </ul>
        {this.state.pictures.length > 0 && <Button onClick={this.loadMore} />}
        {/* <Button onClick={this.loadMore} /> */}
        {/* {this.state.status === 'pending' && (
          <div>
            <Audio height="100" width="100" color="blue" ariaLabel="loading" />
          </div>
        )} */}
        {/* <div>
          <Audio height="100" width="100" color="blue" ariaLabel="loading" />
        </div> */}
      </section>
    );
  }
}
export default ImageGallery;
