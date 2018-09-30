import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Slider, Menu, Dropdown, notification } from 'antd';
import '../style/ReportModal.css';

notification.config({
    placement: 'topLeft',
    top: '90px',
    duration: 5
});

class ReportModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPrice: 10,
            selectedRating: 30
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
                description: 'Thank you for your contribution 🙂',
            });
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
                title="Any idea on what to put here?"
                visible={this.props.open}
                onOk={this.handleFormSubmit}
                onCancel={this.props.closeModal}
                destroyOnClose={true}
                okText="Submit"
                cancelText="Cancel"
            >
                <h3>How much does it cost?</h3>
                <Slider marks={marks} step={5} defaultValue={20} min={0} max={50} tipFormatter={value => `$${value}`} onChange={value => this.setState({ selectedPrice: value })} />
                <br /><br />
                <h3>How 🔥🔥🔥 is {`${this.props.info.name}`}?</h3>
                <Slider defaultValue={50} tipFormatter={value => `${value} 🔥`} onChange={value => this.setState({ selectedRating: value })} />
            </Modal>
        )
    }
}

export default ReportModal;