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

    render() {
        const rating = this.state.rating;
        const ratingStrokeColor = this.getRatingStrokeColor(rating);
        const compactView = this.props.compactView;

        // LocationInfo
        const { name, address, phone, website, pictureURL } = this.props.locationInfo;

        return (
            <div>
                {
                    compactView &&
                    <Card
                        title={name}
                        hoverable
                        onClick={this.openInfoDrawer}
                    // actions={[<Icon type="setting" onClick={() => this.setState({ drawerOpen: true })} />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                    >
                        <Skeleton loading={this.state.loading}>
                            <div className="card-content">
                                <div className="price">No Cover</div>
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
                        hoverable
                        cover={<img alt="example" src={pictureURL} />}
                        onClick={this.openInfoDrawer}
                        loading={this.state.loading}
                    // actions={[<Icon type="setting" onClick={() => this.setState({ drawerOpen: true })} />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                    >
                        <Skeleton loading={this.state.loading}>
                            <div className="card-content">
                                <div className="price">No Cover</div>
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