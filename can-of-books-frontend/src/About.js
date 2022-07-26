import { Component } from "react";
import { Link } from "react-router-dom";

class Profile extends Component {

  render() {
    /* TODO: render information about the developers */
    return(
      <div>
       <p>App developed by Kyel Boisseau and Mandy Mason</p>
       <Link to="/App">Home</Link>
      </div>
    )
  }
};

export default Profile;
