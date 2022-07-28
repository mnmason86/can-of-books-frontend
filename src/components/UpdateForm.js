import { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class  UpdateForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Title: '',
      Description: '',
      Status: '',
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newBook = {
      title: this.state.Title,
      description: this.state.Description,
      status: this.state.Status,
    };
    this.props.submit(newBook);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>
              Update This Book
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.handleSubmit}>
            <Form.Label>Book Title:</Form.Label>
            <Form.Control type='input' id='book-form-title' onChange={(e) => this.setState({Title: e.target.value})}></Form.Control>
            <Form.Label>Book Description:</Form.Label>
            <Form.Control type='input' id='book-form-desc' onChange={(e) => this.setState({Description: e.target.value})}></Form.Control>
            <Form.Label>Have you read this book?:</Form.Label>
            <Form.Control type='input' id='book-form-status' onChange={(e) => this.setState({Status: e.target.value})}></Form.Control>
            <Button type='submit'>
              Save Your Book
            </Button>
          </Form>
      </Modal>
    )
  }
}

export default UpdateForm;