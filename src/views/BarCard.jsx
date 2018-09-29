import React, { Component } from 'react';
import { Card, Icon, Progress, Skeleton } from 'antd';
import moment from 'moment';
import InfoDrawer from './InfoDrawer';
import ReportModal from './ReportModal';
import '../style/BarCard.css';

const strokeColor = {
    "1": "#ffccc7",
    "2": "#ffa39e",
    "3": "#ff7875",
    "4": "#ff4d4f",
    "5": "#f5222d",
}

class BarCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            rating: 65,
            drawerOpen: false,
            modalOpen: false
        }
        this.getRatingStrokeColor = this.getRatingStrokeColor.bind(this);
    }

    getRatingStrokeColor(rating) {
        if (rating >= 90)
            return strokeColor["5"]
        else if (rating >= 70)
            return strokeColor["4"]
        else if (rating >= 50)
            return strokeColor["3"]
        else if (rating >= 20)
            return strokeColor["2"]
        else
            return strokeColor["1"]
    }

    openInfoDrawer = () => {
        this.setState({ drawerOpen: true })
    }

    closeInfoDrawer = () => {
        this.setState({ drawerOpen: false })
    }

    openModal = () => {
        this.setState({ modalOpen: true })
    }

    closeModal = () => {
        this.setState({ modalOpen: false })
    }

    getDisplayPrice = (priceUpdates) => {
        let priceArray = [];
        priceUpdates.forEach(priceUpdate => {
            priceArray.push(priceUpdate.price);
        })
        if (priceArray.length === 0) {
            return "🤷🏻‍♂️";
        } else {
            return this.getArrayMode(priceArray);
        }
    }

    getArrayMode = (inputArray) => {
        let modeDict = {};
        for (var i = 0; i < inputArray.length; i++) {
            if (modeDict[inputArray[i]] === undefined) {
                modeDict[inputArray[i]] = 0;
            }
            modeDict[inputArray[i]] += 1;
        }
        var greatestFreq = 0;
        var mode;
        for (var prop in modeDict) {
            if (modeDict[prop] >= greatestFreq) {
                greatestFreq = modeDict[prop];
                mode = prop;
            }
        }
        return `$${mode.toString()}`;
    }

    getAverageRating = (ratingArray) => {
        if (ratingArray.length === 0) {
            return 0;
        } else {
            return ratingArray.reduce((a, b) => { return a + b }, 0) / ratingArray.length;
        }
    }

    getTimeSinceLastUpdate = (lastPriceUpdate) => {
        const currentTime = moment();
        const differenceInMinutes = currentTime.diff(moment(lastPriceUpdate.timestamp), "minutes");
        if (differenceInMinutes === 0)
            return "Reported less than a minute ago"
        else if (differenceInMinutes < 60)
            return `Last reported ${differenceInMinutes} minutes ago - $${lastPriceUpdate.price}`
        else
            return `Last repored ${differenceInMinutes / 60} hour(s) ago - $${lastPriceUpdate.price}`
    }

    render() {
        const compactView = this.props.compactView;

        // LocationInfo
        const { name, address, phone, website, pictureURL, priceUpdates, ratings } = this.props.locationInfo;

        const displayPrice = this.getDisplayPrice(priceUpdates);
        const averageRating = this.getAverageRating(ratings);
        const ratingStrokeColor = this.getRatingStrokeColor(averageRating);
        const lastPriceUpdate = priceUpdates.length > 0 ? priceUpdates.slice(-1)[0] : null;
        const timeSinceLastUpdate = priceUpdates.length > 0 ? this.getTimeSinceLastUpdate(lastPriceUpdate) : "no available data";

        return (
            <div>
                {
                    compactView &&
                    <Card
                        title={name}
                        hoverable
                        onClick={this.openInfoDrawer}
                    >
                        <Skeleton loading={this.state.loading}>
                            <div className="card-content">
                                <div className="price">{displayPrice}</div>
                                <Progress percent={averageRating} status="active" showInfo={false} strokeWidth={7} strokeColor={ratingStrokeColor} />
                                <div className="update-time">{timeSinceLastUpdate}</div>
                            </div>
                        </Skeleton>
                    </Card>
                }
                {
                    !compactView &&
                    <Card
                        title={name}
                        cover={<img alt="example" src={pictureURL} />}
                        loading={this.state.loading}
                        actions={[
                            <div>17 <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /></div>,
                            <Icon type="edit" onClick={this.openModal} />,
                            <Icon type="info-circle" onClick={this.openInfoDrawer} />
                        ]}
                    >
                        <Skeleton loading={this.state.loading}>
                            <div className="card-content">
                                <div className="price">{displayPrice}</div>
                                <Progress percent={averageRating} status="active" showInfo={false} strokeWidth={7} strokeColor={ratingStrokeColor} />
                                <div className="update-time">{timeSinceLastUpdate}</div>
                            </div>
                        </Skeleton>
                    </Card>
                }
                <InfoDrawer open={this.state.drawerOpen} closeDrawer={this.closeInfoDrawer} info={this.props.locationInfo} />
                <ReportModal open={this.state.modalOpen} closeModal={this.closeModal} info={this.props.locationInfo} onUpdate={this.props.onUpdate} />
            </div>
        )
    }
}

export default BarCard;