import React, { Component } from 'react';
import { Card, Icon, Progress, Tooltip, Skeleton } from 'antd';
import moment from 'moment';
import InfoDrawer from './InfoDrawer';
import ReportModal from './ReportModal';
import '../style/BarCard.css';

class BarCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            drawerOpen: false,
            modalOpen: false
        }
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
            return "less than a minute ago"
        else if (differenceInMinutes < 60)
            return `${differenceInMinutes} minutes ago`
        else {
            const hour = Math.floor(differenceInMinutes / 60);
            const minute = differenceInMinutes - hour * 60;
            return `${hour} hour${hour === 1 ? '' : 's'} ${minute} minute${minute === 1 ? '' : 's'} ago`
        }
    }

    disableReport = () => {
        if (localStorage.getItem(this.props.locationInfo._id) === null) {
            return false;
        } else {
            const lastUpdateTime = localStorage.getItem(this.props.locationInfo._id);
            const minutesSinceLastUpdate = moment().diff(moment(lastUpdateTime), 'minutes');
            if (minutesSinceLastUpdate > 15)
                return false;
            else
                return true;
        }
    }

    render() {
        const compactView = this.props.compactView;

        // LocationInfo
        const { name, pictureURL, priceUpdates, ratings } = this.props.locationInfo;

        const displayPrice = this.getDisplayPrice(priceUpdates);
        const averageRating = this.getAverageRating(ratings);
        const lastPriceUpdate = priceUpdates.length > 0 ? priceUpdates.slice(-1)[0] : null;
        const timeSinceLastUpdate = priceUpdates.length > 0 ? this.getTimeSinceLastUpdate(lastPriceUpdate) : "no available data";

        const disableReport = this.disableReport();

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
                                <div>
                                    <div className="left-emoji">👎🏻</div>
                                    <Progress percent={averageRating} showInfo={false} strokeWidth={7} strokeColor={`rgba(255, 33, 33, ${averageRating / 100})`} />
                                    <div className="right-emoji">🔥</div>
                                </div>
                                {
                                    !lastPriceUpdate &&
                                    <div className="update-time no-data">no available data</div>
                                }
                                {
                                    lastPriceUpdate &&
                                    <div className="update-time">
                                        <span className="last-update">Last report ${lastPriceUpdate.price}</span><br />{timeSinceLastUpdate}
                                    </div>
                                }
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
                        actions={
                            disableReport ?
                                [
                                    <Tooltip placement="bottom" title="You will be able to report again after 15 minutes since you last reported">
                                        <div className="reported"><Icon type="check" size="large" /> Reported</div>
                                    </Tooltip>,
                                    <div onClick={this.openInfoDrawer}><Icon type="info-circle" size="large" /> View</div>
                                ]
                                :
                                [
                                    <div onClick={this.openModal}><Icon type="edit" size="large" /> Report</div>,
                                    <div onClick={this.openInfoDrawer}><Icon type="info-circle" size="large" /> View</div>
                                ]
                        }
                    >
                        <Skeleton loading={this.state.loading}>
                            <div className="card-content">
                                <div className="price">{displayPrice}</div>
                                <div>
                                    <div className="left-emoji">👎🏻</div>
                                    <Progress percent={averageRating} showInfo={false} strokeWidth={7} strokeColor={`rgba(255, 33, 33, ${averageRating / 100})`} />
                                    <div className="right-emoji">🔥</div>
                                </div>
                                {
                                    !lastPriceUpdate &&
                                    <div className="update-time no-data">no available data</div>
                                }
                                {
                                    lastPriceUpdate &&
                                    <div className="update-time">
                                        <span className="last-update">Last report ${lastPriceUpdate.price}</span><br />{timeSinceLastUpdate}
                                    </div>
                                }
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