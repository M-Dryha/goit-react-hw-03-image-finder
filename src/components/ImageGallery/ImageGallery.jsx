import React, { Component } from 'react';
import { Audio } from 'react-loader-spinner';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import GetPicture from '../../API';
import Button from '../Button';
import Modal from '../Modal';

class ImageGallery extends Component {
  state = {
    pictures: [],
    page: 1,
    status: 'idle',
    error: null,
    showModal: false,
    imageId: null,
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
      const normalizeValue = this.props.value;
      const newPicture = await GetPicture(normalizeValue, this.state.page);
      const { pictures } = this.state;

      this.setState(state => ({
        status: 'resolved',
        pictures: [...pictures, ...newPicture.hits],
      }));
    } catch (error) {
      this.setState({
        // error: new Error(`Ooops, no data`),
        status: 'rejected',
      });
      console.log(this.state.error);
    }
  };

  // fetchPicture = async () => {
  //   const { pictures } = this.state;
  //   const normalizeValue = this.props.value;
  //   const response = await GetPicture(normalizeValue, this.state.page);
  //   const newPicture = await response.json();
  //   this.setState(state => ({
  //     status: 'resolved',
  //     pictures: [...pictures, ...newPicture.hits],
  //   }));
  //   return pictures;
  // };

  // Test = async () => {
  //   try {
  //     const pictures = await this.fetchPicture();
  //     console.log(pictures);
  //   } catch (error) {
  //     this.setState({
  //       error: new Error(`Ooops, no data`),
  //       status: 'rejected',
  //     });
  //   }
  // };

  //   fetchPicture = () => {
  //    const { page } = this.state;
  //    const { value } = this.props;
  //    GetPicture(value, page)
  //      .then(pictures => {
  //        if (pictures.ok) {
  //          return pictures.json();
  //        }
  //        return Promise.reject(new Error(`Ooops, no data for ${value}`));
  //      })
  //      .then(pictures =>
  //        this.setState({
  //          // query: values.name,
  //          status: 'resolved',
  //          pictures: [...this.state.pictures, ...pictures.hits],
  //        })
  //      )
  //      .catch(error => this.setState({ error, status: 'rejected' }));
  //  };

  loadMore = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
    console.log(this.state.page);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    // this.findPicture();
  };

  findPicture = imageId => {
    const test = this.state.pictures.find(p => p.id === imageId);
    console.log(test);
  };

  render() {
    const { status, showModal } = this.state;

    if (status === 'pending') {
      return (
        <div className={s.Loader}>
          <Audio height="100" width="100" color="blue" ariaLabel="loading" />
        </div>
      );
    }

    if (status === 'rejected') {
      return <div>No data</div>;
    }

    // if (pictures.length === 0) {
    //   return <div>{error}</div>;
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
              onClick={this.findPicture}
            />
          ))}
        </ul>
        {this.state.pictures.length > 0 && <Button onClick={this.loadMore} />}

        {showModal && (
          <Modal>
            <img
              src={this.findPicture().webformatURL}
              alt={this.findPicture().tags}
            />
          </Modal>
        )}
      </section>
    );
  }
}

//

export default ImageGallery;
