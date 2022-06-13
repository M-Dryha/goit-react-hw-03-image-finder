import React, { Component } from 'react';
import SearchBar from './SearchBar';
import GetPicture from './API';
import ImageGallery from './ImageGallery';

export class App extends Component {
  state = {
    pictures: [],
    page: 1,
    query: '',
  };

  componentDidUpdate(_, prevState) {
    if (this.state.query !== prevState.query) {
      this.setState(this.fetchPicture());
    }
  }

  fetchPicture = async () => {
    const { query } = this.state;
    try {
      const newPicture = await GetPicture(query);
      this.setState(state => ({
        pictures: [...state.pictures, newPicture],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  handleForSubmit = values => {
    this.setState({ query: values.name });
    console.log(this.state.query);
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
