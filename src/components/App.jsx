import React, { Component } from 'react';
import SearchBar from './SearchBar';
import GetPicture from '../API';
import ImageGallery from './ImageGallery';
import Button from './Button';

export class App extends Component {
  state = {
    pictures: [],
    page: 1,
    // query: '',
  };

  // componentDidUpdate(_, prevState) {
  //   if (this.state.page !== prevState.page) {
  //     this.fetch();
  //   }
  // }
  //       this.setState(state => ({
  //         pictures: [...newPictureLoad.hits],
  //       }));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }

  // fetch = async (values, page) => {
  //   try {
  //     const loadPictures = await GetPicture(values.name);
  //     this.setState(state => ({
  //       pictures: [...loadPictures.hits],
  //     }));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  fetchPicture = async values => {
    // const { query } = this.state;
    // if (!values.name) {
    //   alert(`jfjkfj`);
    //   return;
    // }
    try {
      const newPicture = await GetPicture(values.name);

      this.setState(state => ({
        // query: values.name,
        pictures: [...newPicture.hits],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  handleForSubmit = values => {
    this.setState({ query: values.name });
  };

  // loadMore = () => {
  //   // const onButtonClick = e.target;
  //   // const { page } = this.state;
  //   this.setState(({ page }) => {
  //     return { page: page + 1 };
  //   });
  //   console.log(this.state.page);
  // };

  render() {
    const { pictures } = this.state;
    console.log(pictures);
    return (
      <section>
        <SearchBar onSubmit={this.fetchPicture} />

        {pictures.length > 0 && <ImageGallery pictures={pictures} />}
        {pictures.length > 0 && <Button onClick={this.loadMore} />}
      </section>
    );
  }
}
