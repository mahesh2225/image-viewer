import React, { Component } from 'react';
import Header from '../../common/header/Header';
import MediaCard from '../../common/card/MediaCard';
import { Container } from '@material-ui/core';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
      userProfileData: null,
      userMediaDataOrig: null,
      userMediaDataFiltered: null,
      searchText: null
    }
  }
  componentWillMount() {
    if (this.state.loggedIn === false) {
      this.props.history.push('/login');
    }
    fetch(
      this.props.baseUrl +
      "?access_token=" +
      sessionStorage.getItem("access-token")
    )
      .then(res => res.json())
      .then(
          result => {
            this.setState({userProfileData: result.data});
          },
          error => {
            console.log("Error while fetching user profile data from Instagram.",error);
          }
      );

  fetch(
      this.props.baseUrl +
      "media/recent/?access_token=" +
      sessionStorage.getItem("access-token")
  )
      .then(res => res.json())
      .then(
          result => {
            this.setState({userMediaDataOrig: result.data, userMediaDataFiltered: result.data });
          },
          error => {
            console.log("Error while fetching user media data from Instagram.",error);
          }
      );  
    
  }

  checkIfExist = (element) => {
    return element.caption.text.toUpperCase().split("#")[0].indexOf(this.state.searchText.toUpperCase()) > -1
  }

  onSearchHandler = event => {
    console.log("onSearchHandler");
    this.setState({ searchText: event.target.value });
    if ( this.state.searchText == null || this.state.searchText.trim() === "" ) {
      this.setState({userMediaDataFiltered: this.state.userMediaDataOrig});
    } else {
      var userMediaDataFiltered = this.state.userMediaDataOrig.filter( this.checkIfExist );
      this.setState({userMediaDataFiltered: userMediaDataFiltered});
    }
  }

  render() {
    return (
      <div>
        <Header {...this.props} showSearchBar={true} showProfileIcon={true} showOnlyLogoutMenu={false} searchHandler={this.onSearchHandler}/>
        <Container>
            <MediaCard {...this.props} userMediaData={this.state.userMediaDataFiltered}/>
        </Container>
      </div>
    )
  }
}

export default Home;