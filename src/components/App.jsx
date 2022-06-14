import React, { Component } from 'react';
import SearchBar from './SearchBar';
import GetPicture from './API';
import ImageGallery from './ImageGallery';

export class App extends Component {
  state = {
    pictures: [],
    page: 1,
    // query: '',
  };

  // componentDidUpdate(_, prevState) {
  //   if (this.state.query !== prevState.query) {
  //     this.setState(this.fetchPicture());
  //   }
  // }

  fetchPicture = async values => {
    // const { query } = this.state;
    try {
      const newPicture = await GetPicture(values.name);
      console.log(newPicture);
      this.setState(state => ({
        pictures: [...state.pictures, ...newPicture.hits],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  // handleForSubmit = values => {
  //   this.setState({ query: values.name });
  // };

  render() {
    const { pictures } = this.state;
    console.log(pictures);
    return (
      <section>
        <SearchBar onSubmit={this.fetchPicture} />

        {/* {pictures.length > 0 && (
          <ul>
            {pictures.map(({ webformatURL, tags }) => (
              <li>
                <img src={webformatURL} alt={tags} />
              </li>
            ))}
          </ul>
        )} */}
        {pictures.length > 0 && <ImageGallery pictures={pictures} />}
      </section>
    );
  }
}
