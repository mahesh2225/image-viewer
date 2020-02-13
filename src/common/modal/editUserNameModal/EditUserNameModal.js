import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import './EditUserNameModal.css';

class EditUserNameModal  extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            fullName: null,
            typedFullname: null,
            errorFullNameRequired: false
        }

    }
    onEditFullNameType = (e) => {
        this.setState({
            typedFullname: e.target.value
        })
    }

    onSubmitClickHandler = () => {
        if (this.state.typedFullname == null || this.state.typedFullname.trim() === "") {
            this.setState({
                errorFullNameRequired: true
            })
        } else {
            this.setState({
                fullName: this.state.typedFullname,
                errorFullNameRequired: false
            })
            this.props.onSubmitEditUserModal(this.state.typedFullname)
        }
    }

    render() {
        return (
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.openEditUserModal}
                    onClose={this.props.onCloseEditUserModal}
                    onBackdropClick={this.props.onCloseEditUserModal}
                >
                    <div className="modal-div">
                        <h2 id="simple-modal-title">Edit</h2>
                        <FormControl id="fullName-form-control" required>
                            <InputLabel htmlFor="fullName">Full Name</InputLabel>
                            <Input id="fullName" type="text" onChange={this.onEditFullNameType}/>
                            {this.state.errorFullNameRequired ? <FormHelperText>
                            <span className="red">Full name required</span>
                            </FormHelperText> : null}
                        </FormControl>
                        <div style={{ marginTop: "1rem" }}>
                            <Button variant="contained" color="primary" disabled={!this.state.typedFullname}
                                    onClick={this.onSubmitClickHandler}>Update</Button>
                        </div>
                    </div>
                </Modal>

        );
    }
}

export default EditUserNameModal;
