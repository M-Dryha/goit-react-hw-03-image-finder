import React, { Component } from 'react';
import { Oval } from 'react-loader-spinner';
import SearchBar from './SearchBar';
import GetPicture from './../API';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Modal from './Modal';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    pictures: [],
    status: 'idle',
    error: null,
    showModal: false,
    imageId: null,
    bigImg: null,
    tags: null,
    totalPictures: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchPicture();
      // window.scrollBy({
      //   top: document.body.clientHeight,
      //   behavior: 'smooth',
      // });
    }
  }

  handleForSubmit = values => {
    this.setState({
      query: values.name,
      pictures: [],
      status: 'pending',
      page: 1,
    });
  };

  fetchPicture = async () => {
    try {
      const normalizeValue = this.state.query;
      const newPicture = await GetPicture(normalizeValue, this.state.page);
      const { pictures } = this.state;

      this.setState(state => ({
        status: 'resolved',
        pictures: [...pictures, ...newPicture.hits],
        totalPictures: newPicture.totalHits,
      }));

      if (newPicture.totalHits === 0) {
        this.setState({ status: 'rejected' });
        return;
      }
    } catch (error) {
      this.setState({
        status: 'rejected',
      });
    }
  };

  loadMore = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  findPicture = imageId => {
    const findModalImg = this.state.pictures.find(p => p.id === imageId);
    this.setState({
      bigImg: findModalImg.webformatURL,
      tags: findModalImg.tags,
    });
    this.toggleModal();
  };

  render() {
    const { pictures, query, status, showModal, totalPictures } = this.state;

    return (
      <div className="App">
        <SearchBar onSubmit={this.handleForSubmit} />
        {status === 'rejected' && (
          <div className="Notification">Ooops, no data for "{query}" =(</div>
        )}

        {status === 'pending' && (
          <div className="Loader">
            <Oval color="#00BFFF" height={80} width={80} />
          </div>
        )}

        <ImageGallery
          showModal={showModal}
          onClick={this.findPicture}
          pictures={pictures}
        />
        {pictures.length > 0 && totalPictures !== pictures.length && (
          <Button onClick={this.loadMore} />
        )}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.state.bigImg} alt={this.state.tags} />
          </Modal>
        )}
      </div>
    );
  }
}
