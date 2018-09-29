import React, { Component } from 'react';
import logo from '../logo.svg';
import { Input, Dropdown, Button, Icon, Menu, Checkbox } from 'antd';
import BarCard from './BarCard';
import appLogo from '../image/logo.png';
import '../style/App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedSortingOption: "2",
			compactView: false
		};
		this.handleMenuClick = this.handleMenuClick.bind(this);
		this.updateViewImage = this.updateViewImage.bind(this);
	}

	handleMenuClick(option) {
		this.setState({ selectedSortingOption: option.key })
	}

	updateViewImage(e) {
		this.setState({ compactView: e.target.checked })
	}

	render() {
		const sortMenu = (
			<Menu onClick={this.handleMenuClick} defaultSelectedKeys={["2"]} selectedKeys={[this.state.selectedSortingOption]}>
				<Menu.Item key="1"><Icon type="dollar" />Cover Price</Menu.Item>
				<Menu.Item key="2"><Icon type="sort-ascending" />Name</Menu.Item>
				<Menu.Item key="3"><Icon type="fire" />Hotness</Menu.Item>
			</Menu>
		);

		return (
			<div className="app">
				<div className="header">
					<div className="title">
						<img src={appLogo} />
						Rebel Radar
        		</div>
				</div>
				<div className="body">
					<div className="main-actions">
						<Input
							placeholder="Search..."
							size="large"
						/>
						<Dropdown overlay={sortMenu}>
							<Button size="large">
								Sort By <Icon type="down" />
							</Button>
						</Dropdown>
						<Checkbox onChange={this.updateViewImage} defaultChecked={this.state.viewImage}>
							Compact View
						</Checkbox>
					</div>
					<div className="cards-collection">
						<BarCard compactView={this.state.compactView} />
						<BarCard compactView={this.state.compactView} />
						<BarCard compactView={this.state.compactView} />
						<BarCard compactView={this.state.compactView} />
						<BarCard compactView={this.state.compactView} />
						<BarCard compactView={this.state.compactView} />
						<BarCard compactView={this.state.compactView} />
						<BarCard compactView={this.state.compactView} />
						<BarCard compactView={this.state.compactView} />
						<BarCard compactView={this.state.compactView} />
					</div>
				</div>
				<div className="footer">
					Rebel Radar © - VolHacks 2018
        		</div>
			</div>
		);
	}
}

export default App;