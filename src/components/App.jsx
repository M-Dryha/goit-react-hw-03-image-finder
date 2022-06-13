import React, { Component } from 'react';
import SearchBar from './SearchBar';
import GetPicture from './API';
import ImageGallery from './ImageGallery';

export class App extends Component {
  state = {
    pictures: [],
    page: 1,
  };

  handleForSubmit = async (values, page) => {
    try {
      const newPicture = await GetPicture(values);
      this.setState(state => ({
        pictures: [...state.pictures, newPicture],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  // componentDidUpdate(prevProps, prevState) {
  //   async componentDidUpdate(prevProps, prevState) {
  //   if (this.state.values !== prevState.values)
  //   { }
  // }
  // }
  render() {
    const { pictures } = this.state;
    console.log(this.state.pictures);
    return (
      <>
        <SearchBar onSubmit={this.handleForSubmit} />
        <ImageGallery pictures={pictures} />
      </>
    );
  }
}
