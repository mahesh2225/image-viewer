import React, { Component } from 'react';
import './Header.css';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from "@material-ui/core/Avatar";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            userProfileData: null
        }

    }
    componentWillMount() {
        if (this.state.loggedIn === false) {
            this.props.history.push('/login');
        }

        fetch(this.props.baseUrl + '?access_token=' + sessionStorage.getItem('access-token'))
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({userProfileData: result.data});

                },
                (error) => {
                    console.log("Error while fetching user profile data from Instagram.",error);
                }
            )
    }
    menuOpenHandler = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }
    menuCloseHandler = () => {
        this.setState({ anchorEl : null });
    }
    menuMyAccountHandler = () => {
        this.menuCloseHandler();
        this.props.history.push('/profile');
    }

    logoutHandler = () => {
        sessionStorage.removeItem("access-token");
        this.menuCloseHandler();
        this.props.history.push('/login');
    }

    homePageOpenHandler = () => {
        this.props.history.push('/home');
    }

    render() {
        return (
            <div className="header">
                <div className="title" onClick={this.homePageOpenHandler} >Image Viewer</div>
                
                <div className="header-right">
                    { this.props.showSearchBar === true ?
                    <div id="search-field">
                        <div className="searchIcon" >
                            <SearchIcon />
                        </div>
                        <Input id="search-text" className="searchInput" disableUnderline={true} placeholder="Search..." onChange={this.props.searchHandler} />
                    </div>
                        : ""
                    }
                    { this.props.showProfileIcon === true ?
                    <IconButton id="profile-icon" edge="start" color="inherit" aria-label="menu"  >
                        {this.state.userProfileData ?
                            <Avatar alt={this.state.userProfileData.full_name} id="profile-icon" fontSize="small"
                                    variant="circle" src={this.state.userProfileData.profile_picture} onClick={this.menuOpenHandler} /> : null}
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.menuCloseHandler}
                        >
                            { this.props.showOnlyLogoutMenu === false ?
                                <MenuItem onClick={this.menuMyAccountHandler}>My account</MenuItem>
                                : ""
                            }
                            <MenuItem onClick={this.logoutHandler}>Logout</MenuItem>
                        </Menu>
                    </IconButton>
                        : ""
                    }
                </div> 
            </div>

        )
    }
}

export default Header;