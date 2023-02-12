import React, { Component } from 'react';

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "home"
    };
  }

  changePage = (pageName) => {
    this.setState({
      currentPage: pageName
    });
  }

  render() {
    let page;
    if (this.state.currentPage === "home") {
      page = <HomePage />
    } else if (this.state.currentPage === "addProducts") {
      page = <AddProducts />
    } else if (this.state.currentPage === "profile") {
      page = <Profile />
    }

    return (
      <div>
        <div className="admin-panel">
          <div className="navigation-bar">
            <button onClick={() => this.changePage("home")}>Home</button>
            <button onClick={() => this.changePage("addProducts")}>Add Products</button>
            <button onClick={() => this.changePage("profile")}>Profile</button>
          </div>
          {page}
        </div>
      </div>
    );
  }
}

const HomePage = () => (
  <div>
    <h1>Welcome to Admin Panel Home Page</h1>
  </div>
);

const AddProducts = () => (
  <div>
    <h1>Add Products to the Admin Panel</h1>
  </div>
);

const Profile = () => (
  <div>
    <h1>Admin Panel Profile Page</h1>
  </div>
);

export default AdminPanel;