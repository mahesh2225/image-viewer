import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import './ViewImageModal.css';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { red } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";


class ViewImageModal extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            liked: [],
            comments: []
        }
    }
    onlikeMedia = () => {
        let index = this.props.imageIndex;
        let l = this.state.liked;
        l[index] = !l[index];
        this.setState({
            liked: l,
        })
    }

    onAddComment = () => {
        let index = this.props.imageIndex;
        var textbox = document.getElementById("add-user-comment-image");
        if (textbox.value == null || textbox.value.trim() === "") {
            return;
        }
        let c = this.state.comments;
        if (c[index] == null) {
            c[index] = [textbox.value];
        } else {
            c[index] = c[index].concat([textbox.value]);
        }
        this.setState({
            comments: c,
        })
        textbox.value = '';
    }

    render() {
        let mediaObj = this.props.imageViewMediaObject;
        let index = this.props.imageIndex;
        let height = 0;
        height = ( mediaObj ? parseInt(mediaObj.images.standard_resolution.height)* 0.4 : 0);
        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.openImageViewModal}
                onClose={this.props.onCloseImageViewModal}
                onBackdropClick={this.props.onCloseImageViewModal}
            >
                <div class="modal-div">
                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={6}>
                            {mediaObj ? (
                                <img
                                    src={mediaObj.images.standard_resolution.url}
                                    alt={mediaObj.images.standard_resolution.url}
                                    style={{
                                        height: "100%",
                                        width: "100%"
                                    }}
                                ></img>
                            ) : null}
                        </Grid>
                    <Grid item xs={6} style={{minHeight: 'auto'}}>
                            {mediaObj ? (
                                <div>
                                    <Grid className="user-detail-section"
                                        container
                                        spacing={1}
                                        direction="row"
                                    >
                                        <Grid item xs={4}>
                                            <Avatar
                                                alt={mediaObj.user.full_name}
                                                src={mediaObj.user.profile_picture}
                                            />
                                        </Grid>{" "}
                                        <Grid item xs={8}>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                component="p"
                                            >
                                                {mediaObj.user.username}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider variant="fullWidth" />
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        {mediaObj.caption.text.split("#")[0]}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        {mediaObj.tags.map(tag => {
                                            return (
                                                <span
                                                    style={{ color: "#1976d2", fontSize: "14px" }}
                                                    size="small"
                                                    key={tag}
                                                    color="primary"
                                                >
                                                    #{tag}{" "}
                                                </span>
                                            );
                                        })}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="div"
                                        class="comment-section"
                                        style={{minHeight: height}}
                                    >
                                        {this.state.comments &&
                                            this.state.comments[index] &&
                                            this.state.comments[index].length > 0 &&
                                            this.state.comments[index].map(comment => {
                                                return (
                                                    <p
                                                        style={{ fontSize: "16px", fontWeight: "bold" }}
                                                        key={comment}
                                                    >
                                                        <b>{mediaObj.user.username}:</b> {comment}
                                                    </p>
                                                );
                                            })}
                                    </Typography>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites" onClick={() => this.onlikeMedia()}>
                                            {this.state.liked[index] ? <FavoriteIcon style={{ color: red[500] }} /> : <FavoriteBorderIcon />}
                                        </IconButton>
                                        <span>{this.state.liked[index] ? mediaObj.likes.count + 1 : mediaObj.likes.count} likes</span>
                                    </CardActions>
                                    <Grid className="comment-add-section" container spacing={3}>
                                        <Grid item xs={10}>
                                            <TextField id="add-user-comment-image" className="add-comment-text-field" label="Add a comment" fullWidth={true} />
                                        </Grid>
                                        <Grid item xs={2} className="add-button-grid">
                                        <Button className="add-button"
                                            variant="contained"
                                            id="add-comments-button"
                                            color="primary"
                                            onClick={this.onAddComment} >Add</Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            ) : null}
                        </Grid>
                    </Grid>
                </div>
            </Modal >
        );
    }
}

export default ViewImageModal;
