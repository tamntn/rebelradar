import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Modal, Slider, notification } from 'antd';
import '../style/ReportModal.css';

notification.config({
    placement: 'topRight',
    top: '90px',
    duration: 10
});

class ReportModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPrice: 20,
            selectedRating: 50
        }
    }

    handleFormSubmit = () => {
        const locationId = this.props.info._id;

        axios.all([
            axios.post(`https://rebelradar-api.herokuapp.com/api/price/${locationId}`, { "price": this.state.selectedPrice }),
            axios.post(`https://rebelradar-api.herokuapp.com/api/ratings/${locationId}`, { "rating": this.state.selectedRating }),
        ]).then(() => {
            notification["success"]({
                message: 'Submission has been received',
                description: 'Thank you for your contribution. You will be able to report again after 15 minutes 🙂',
            });
            localStorage.setItem(this.props.info._id, moment().format());
            this.props.onUpdate();
            this.props.closeModal();
        }).catch(() => {
            notification["error"]({
                message: 'Submission was not successful',
                description: 'Please try again 😭',
            });
        })
    }

    render() {
        const marks = {
            0: {
                style: {
                    color: '#7cb305',
                },
                label: <strong>Free!</strong>,
            },
            10: "$10",
            20: "$20",
            30: "$30",
            40: "$40",
            50: {
                style: {
                    color: '#f50',
                },
                label: <strong>$50</strong>,
            },
        };

        return (
            <Modal
                title={this.props.info.name}
                visible={this.props.open}
                onOk={this.handleFormSubmit}
                onCancel={this.props.closeModal}
                destroyOnClose={true}
                okText="Submit"
                cancelText="Cancel"
            >
                <h3>How much does it cost?</h3>
                <Slider marks={marks} step={5} defaultValue={this.state.selectedPrice} min={0} max={50} tipFormatter={value => `$${value}`} onChange={value => this.setState({ selectedPrice: value })} />
                <br /><br />
                <h3>How will you rate the current atmosphere here?</h3>
                <Slider defaultValue={this.state.selectedRating} tipFormatter={value => `${value} 🔥`} onChange={value => this.setState({ selectedRating: value })} />
            </Modal>
        )
    }
}

export default ReportModal;