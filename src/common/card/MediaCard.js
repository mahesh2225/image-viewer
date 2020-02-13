import React , {Component} from 'react';
import { red } from '@material-ui/core/colors';
import './MediaCard.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

class MediaCard extends Component {
    
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            liked: [],
            comments: []
        }
    }
    onlikeMedia = (index) => {
        console.log(index);
        let l = this.state.liked; 
        l[index] = !l[index];
        this.setState({
            liked: l,
        })   
    }

    onAddComment = (index) => {
        var textbox = document.getElementById("textfield-"+index);
        if( textbox.value == null || textbox.value.trim() === "" ) {
            return;
        }
        let c = this.state.comments;
        if(c[index] == null) {
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
    // const { classes } = this.props;
    return (
            <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center" >
                { this.props.userMediaData && this.props.userMediaData.map((mediaObj, index) => 
                    (<Grid item xs={6} key={mediaObj.id} alignItems='top' >
                        <Card>
                            <CardHeader
                                avatar={ <Avatar variant="circle" alt={mediaObj.user.username} src={mediaObj.user.profile_picture} /> }
                                title={mediaObj.user.username}
                                subheader={<Moment format="DD/MM/YYYY HH:mm:ss" interval={mediaObj.caption.created_time} />}
                            />
                            <CardMedia image={mediaObj.images.standard_resolution.url} />
                            <br/>
                            <Divider variant="middle"/>
                            <CardContent>
                                <Typography component="p">
                                    {mediaObj.caption.text.split("#")[0]}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {mediaObj.tags.map(tag => {
                                    return (
                                        <span style={{ color: "#1976d2", fontSize: "14px" }} size="small" key={tag}>#{tag}{" "}
                                        </span>
                                        );
                                    })}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="div" >
                                    {   this.state.comments &&
                                        this.state.comments.length > 0 &&
                                        this.state.comments[index] && 
                                        this.state.comments[index].length > 0 &&
                                        this.state.comments[index].map(comment => {
                                        return (
                                            <p style={{ fontSize: "16px" }} key={comment}>
                                            <b>{mediaObj.user.username}:</b> {comment}
                                            </p>
                                        );
                                    })}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites" onClick={() => this.onlikeMedia(index)}>
                                { this.state.liked[index] ? <FavoriteIcon style={{ color: red[500]}} /> : <FavoriteBorderIcon /> }
                            </IconButton>
                            <span>{ this.state.liked[index] ?  mediaObj.likes.count + 1 : mediaObj.likes.count } likes</span>
                            </CardActions>
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={10}>
                                        <TextField id={"textfield-"+index} className="add-comment-text-field" label="Add a comment" fullWidth={true} />
                                    </Grid>
                                    <Grid item xs={2} className="add-button-grid">
                                        <Button className="add-button"
                                            variant="contained"
                                            id="add-comments-button"
                                            color="primary"
                                            onClick={() => this.onAddComment(index)} >Add</Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                </Grid>))}
          </Grid>
        )
    }
}

export default MediaCard;