import React, { Component } from 'react';
import { Card, Icon, Progress, Skeleton } from 'antd';
import InfoDrawer from './InfoDrawer';
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
            drawerOpen: false
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

    getDisplayPrice = (priceUpdates) => {
        let priceArray = [];
        priceUpdates.forEach(priceUpdate => {
            priceArray.push(priceUpdate.price);
        })
        if (priceArray.length === 0) {
            return "No Cover";
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

    render() {
        const rating = this.state.rating;
        const ratingStrokeColor = this.getRatingStrokeColor(rating);
        const compactView = this.props.compactView;

        // LocationInfo
        const { name, address, phone, website, pictureURL, priceUpdates, ratings } = this.props.locationInfo;

        const displayPrice = this.getDisplayPrice(priceUpdates);

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
                                <Progress percent={rating} status="active" showInfo={false} strokeWidth={7} strokeColor={ratingStrokeColor} />
                                <div className="update-time">Updated 7 minutes ago</div>
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
                            <Icon type="edit" />,
                            <Icon type="info-circle" onClick={this.openInfoDrawer} />
                        ]}
                    >
                        <Skeleton loading={this.state.loading}>
                            <div className="card-content">
                                <div className="price">{displayPrice}</div>
                                <Progress percent={rating} status="active" showInfo={false} strokeWidth={7} strokeColor={ratingStrokeColor} />
                                <div className="update-time">Updated 7 minutes ago</div>
                            </div>
                        </Skeleton>
                    </Card>
                }
                <InfoDrawer open={this.state.drawerOpen} closeDrawer={this.closeInfoDrawer} info={this.props.locationInfo} />
            </div>
        )
    }
}

export default BarCard;