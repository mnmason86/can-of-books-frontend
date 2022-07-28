import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import pic from '../img/bookBg.jpg'
import Form from 'react-bootstrap/Form'

const herokuUrl = process.env.REACT_APP_HEROKU_URL;


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showAddModal: false,
      carouselIndex: 0
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
async getBooks() { 
    let results = await axios.get(`${herokuUrl}/books`)
    this.setState({
      books: results.data
    })
}

addBook = (book) => {
  axios.post(`${herokuUrl}/books`,book)
  .then(response => {
    const lastIndex = this.state.books.length;
    this.setState({books: [...this.state.books, response.data], showModal: false, carouselIndex: lastIndex})
  })
  .catch(error => {
    console.error(error);
  })
}

deleteBook = async (bookID) => {
  console.log(bookID);
   await axios.delete(`${herokuUrl}/books/${bookID}`)
  .then(() => {
    console.log(this.state.books);
    this.deleteFromState(bookID);
  })
}

deleteFromState = (bookID) => {
  const stateArray = this.state.books.filter(book => {
    return !(book._id === bookID)

  })
  this.setState({books: stateArray, carouselIndex: 0})
}

handleCarouselIndex = (chosenIndex, e) => {
  this.setState({carouselIndex: chosenIndex})
}

updateBook = async (e) => {

  e.preventDefault();
  const title = e.target[0].value;
  const description = e.target[1].value;
  const status = e.target[2].value;
  const id = e.target[3].value;
  await axios.put(`${herokuUrl}/books/${id}`, {title:title, description: description, status:status})
  .then(response => {
    
    const updateBooks = Array(...this.state.books);
    const book = updateBooks.find(book => book._id === id);
    book.title = title;
    book.description = description;
    book.status = status;
    book._id = response.data._id;
    this.setState({books: updateBooks});
    alert(`Your book, ${response.data.title}, has been updated.`);
  })
}

componentDidMount () {
this.getBooks();
}

  render() {

    return (
      <>
        <h2 id="collection-header" style={{textAlign: 'center', margin: 'auto'}}>My Favorite Books Collection</h2>
        <Button onClick={(e) => this.setState({showAddModal: true})}>
          Add A New Book
        </Button>
        <BookFormModal show={this.state.showAddModal} close={(e) => this.setState({showAddModal:false})} submit={this.addBook}></BookFormModal>
        {this.state.books.length ? (
          <Carousel activeIndex={this.state.carouselIndex} onSelect={this.handleCarouselIndex}>
            {this.state.books.map(element =>
              <Carousel.Item id="carousel-item" key={element._id} style={{marginTop: 40, marginBottom: 40}}>
                <img id="carousel-img" src={pic} alt=' ' style ={{height: 350, width: 2000}}></img>
                <Carousel.Caption id="caption" style={{display: 'block', textAlign: 'center', marginTop: '1rem'}}>
                  <Form onSubmit={this.updateBook}>
                    <Form.Control defaultValue={element.title} style={{backgroundColor:'#8893a6', marginBottom: '.5rem', marginTop: '1rem', fontWeight: 'bold'}}/>
                    <Form.Control defaultValue={element.description} style={{backgroundColor:'#a9b8cf', marginBottom: '.5rem', display: 'inline-block', width: '100%'}} className="text-wrap"/>
                    <Form.Control defaultValue={element.status} style={{backgroundColor:'#c5d5f0', marginBottom: '.5rem'}}/>
                    <Form.Control defaultValue={element._id} disabled />
                    <Button type="submit" variant="success" style={{marginBottom: '.5rem'}}>
                    Update This Book
                  </Button>
                  </Form>
                  <Button onClick={e => this.deleteBook(element._id)}>
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
