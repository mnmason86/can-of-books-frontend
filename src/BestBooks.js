import React from 'react';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
getBooks = async () => {
  try {
    console.log(`{SERVER}/books`)
    let results = await axios.get(`${SERVER}/books`)
    this.setState({
      books: results.data
    })
  } catch (error) {
    console.log('error')
  }
  componentDidMount () 
    this.getBooks();
  }

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <p>{this.state.books.carousel({
                interval: 3000
          })}</p>
        ) : (
          <h3>No Books Found</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
