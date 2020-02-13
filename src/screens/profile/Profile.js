import React, { Component } from 'react';
import Header from '../../common/header/Header';
import MediaGrid from '../../common/grid/MediaGrid';
import { Container } from '@material-ui/core';
import './Profile.css';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import EditUserNameModal from "../../common/modal/editUserNameModal/EditUserNameModal";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
      userProfileData: null,
      userRecentMediaData: null,
      openEditUserModal: false,
      updateUserFullName: null,
      openImageViewModal: false
    }
  }

  componentWillMount() {
    if (this.state.loggedIn === false) {
      this.props.history.push('/login');
    }
    fetch(
      this.props.baseUrl + "?access_token=" +
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
      this.props.baseUrl + "media/recent/?access_token=" +
      sessionStorage.getItem("access-token")
  )
      .then(res => res.json())
      .then(
          result => {
            this.setState({
              userRecentMediaData: result.data
            });
          },
          error => {
            console.log("Error while fetching user recent media data from Instagram.",error);
          }
      );  
    
  }
  onOpenEditUserModal = () => {
    this.setState({openEditUserModal: true})
  }

  onCloseEditUserModal = () => {
    this.setState({openEditUserModal: false})
  }
  onSubmitEditUserModal  = (name) => {
    this.setState({updateUserFullName: name})
    this.onCloseEditUserModal();
  }

  onOpenImageViewModal = () => {
    this.setState({openImageViewModal: true})
  }

  onCloseImageViewModal = () => {
    this.setState({openImageViewModal: false})
  }


  render() {
    return (
      <div>
        <Header {...this.props} showSearchBar={false} showProfileIcon={true} showOnlyLogoutMenu={true} />
        <Container>
        <div style={{ height: "2rem" }}></div>
        <Grid container spacing={3} justify="flex-start">
            <Grid item xs={2}/>
            <Grid item xs={2}>
              {this.state.userProfileData ? (
                <Avatar
                  alt={this.state.userProfileData.full_name}
                  id="profile-image"
                  fontSize="small"
                  variant="circle"
                  src={this.state.userProfileData.profile_picture}
                />
              ) : null}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" component="h2">
                {this.state.userProfileData
                  ? this.state.userProfileData.username
                  : null}
              </Typography>
              <Grid container spacing={3} justify="center">
                <Grid item xs={4}>
                  Posts:{" "}
                  {this.state.userProfileData
                    ? this.state.userProfileData.counts.media
                    : null}
                </Grid>
                <Grid item xs={4}>
                  Follows:{" "}
                  {this.state.userProfileData
                    ? this.state.userProfileData.counts.follows
                    : null}
                </Grid>
                <Grid item xs={4}>
                  Follows By:{" "}
                  {this.state.userProfileData
                    ? this.state.userProfileData.counts.followed_by
                    : null}
                </Grid>
              </Grid>
              <Typography variant="h5" component="h2">
                {this.state.updateUserFullName ? this.state.updateUserFullName : null}
                {this.state.userProfileData && !this.state.updateUserFullName
                  ? this.state.userProfileData.full_name
                  : null}
                <Fab
                  color="secondary"
                  id="edit-profile"
                  aria-label="edit"
                  fontSize="small"
                  onClick={this.onOpenEditUserModal}
                >
                <EditIcon fontSize="small" />
                </Fab>
              </Typography>
            </Grid>
            <Grid item xs={4}/>
          </Grid>
          <MediaGrid {...this.props}  userRecentMediaData={this.state.userRecentMediaData} openImageViewModal={this.state.openImageViewModal} />
          <EditUserNameModal {...this.props} 
            openEditUserModal={this.state.openEditUserModal}
            onCloseEditUserModal={this.onCloseEditUserModal}
            onSubmitEditUserModal={this.onSubmitEditUserModal}
          />
        </Container>
      </div>
    )
  }
}

export default Profile;