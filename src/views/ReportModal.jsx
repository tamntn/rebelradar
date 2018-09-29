import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Slider, Menu, Dropdown, message } from 'antd';
import '../style/ReportModal.css';

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
            axios.post(`http://localhost:3000/api/price/${locationId}`, { "price": this.state.selectedPrice }),
            axios.post(`http://localhost:3000/api/ratings/${locationId}`, { "rating": this.state.selectedRating }),
        ]).then(() => {
            message.success("Thank you for your submission!");
            this.props.onUpdate();
            this.props.closeModal();
        }).catch(() => {
            message.error("Your submission was not successful");
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
                <Slider marks={marks} step={5} defaultValue={10} min={0} max={50} tipFormatter={value => `$${value}`} onChange={value => this.setState({ selectedPrice: value })} />
                <br /><br />
                <h3>How 🔥🔥🔥 is {`${this.props.info.name}`}?</h3>
                <Slider defaultValue={30} tipFormatter={value => `${value} 🔥`} onChange={value => this.setState({ selectedRating: value })} />
            </Modal>
        )
    }
}

export default ReportModal;