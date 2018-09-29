import React, { Component } from 'react';
import { Card, Icon, Progress, Skeleton } from 'antd';
import './BarCard.css';
import InfoDrawer from './InfoDrawer';

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

        return (
            <div>
                {
                    compactView &&
                    <Card
                        title="BAR NAME 🔥"
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
                        title="BAR NAME 🔥"
                        hoverable
                        cover={<img alt="example" src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/15871466_1644719459162000_8163189671313138506_n.jpg?_nc_cat=104&oh=60b48f0ea8088615771e71dbae376e40&oe=5C5B5408" />}
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
                <InfoDrawer open={this.state.drawerOpen} closeDrawer={this.closeInfoDrawer} />
            </div>
        )
    }
}

export default BarCard;