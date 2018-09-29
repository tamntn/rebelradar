import React, { Component } from 'react';
import { Drawer, Button } from 'antd';
import '../style/InfoDrawer.css';

class InfoDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({ visible: newProps.open })
    }

    render() {
        return (
            <Drawer
                title="Bar Name"
                placement="right"
                onClose={this.props.closeDrawer}
                destroyOnClose={true}
                maskClosable={true}
                visible={this.state.visible}
                style={{
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: 53,
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e8e8e8',
                        padding: '10px 16px',
                        textAlign: 'right',
                        left: 0,
                        background: '#fff',
                        borderRadius: '0 0 4px 4px',
                    }}
                >
                    <Button
                        style={{
                            marginRight: 8,
                        }}
                        onClick={this.props.closeDrawer}
                    >
                        Cancel
                    </Button>
                    <Button onClick={this.props.closeDrawer} type="primary">Submit</Button>
                </div>
            </Drawer>
        );
    }
}

export default InfoDrawer;