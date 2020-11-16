import React, { Component } from 'react';
import '../App.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleSearchClick(e) {
    this.props.handleSearchInputChange(this.state.value);
  }
  render() {
    return (
      <div className="search-bar">
        <input
          className="form-control"
          type="text"
          value={this.state.value}
          onChange={this.handleInputChange}
        />
        <button className="btn hidden-sm-down" onClick={this.handleSearchClick}>
          검색
        </button>
      </div>
    );
  }
}

export default Search;
