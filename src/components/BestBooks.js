import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap/Carousel';
import { Button } from 'react-bootstrap/Button';

const herokuUrl = process.env.REACT_APP_HEROKU_URL;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
async getBooks() {
  try {
    
    let results = await axios.get(`${herokuUrl}/books`)
    this.setState({
      books: results.data
    })
  } catch (error) {
    console.log('error')
  }
}

addBook = (book) => {
  axios.post(herokuUrl,book)
  .then(response => {
    this.setState({books: [...this.state.books,response.data]})
  })
  .catch(error => {
    console.error(error);
  })
}

deleteBook = (bookID) => {
  axios.delete(herokuUrl + `/${bookID}`)
  .then(() => {
    this.deleteFromState(bookID);
  })
}

deleteFromState = (bookID) => {
  const stateArray = this.state.books.filter(book => {
    return !(book._id === bookID)
  })
  this.setState({books: stateArray})
}


componentDidMount () {
this.getBooks();
}

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel>
            {this.state.books.map(element =>
              <Carousel.Item id="carousel-item">
                <img id="carousel-img" src='https://place-hold.it/1800x400/black/white' alt='sample background'></img>
                <Carousel.Caption id="caption">
                  <h3 id="carousel-title">{element.title}</h3>
                  <p id="carousel-desc">{element.description}</p>
                  <p id="carousel-status">{element.status}</p>
                  <Button onClick={b => this.deleteBook(element._id)}>
                    Remove This Book
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
              )}
          </Carousel>
        ) : (
          <h3>No Books Found</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
