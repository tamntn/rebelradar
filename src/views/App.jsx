import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import socketIoClient from 'socket.io-client';
import { Input, Dropdown, Button, Icon, Menu, Checkbox, Spin } from 'antd';
import BarCard from './BarCard';
import appLogo from '../image/logo.png';
import '../style/App.css';

const io = socketIoClient('https://rebelradar-api.herokuapp.com');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			searchKeyWord: "",
			selectedSortingOption: "3",
			compactView: false,
			locations: []
		};
		this.handleMenuClick = this.handleMenuClick.bind(this);
		this.updateViewImage = this.updateViewImage.bind(this);
	}

	componentDidMount() {
		this.getAllLocationsInfo();
		io.on('newPriceUpdate', () => {
			this.getAllLocationsInfo();
		});
	}

	getAllLocationsInfo = () => {
		const url = `https://rebelradar-api.herokuapp.com/api/locations`;
		axios.get(url)
			.then(result => {
				const locations = result.data.data;
				this.setState({
					loading: false,
					locations
				})
			});
	}

	onUpdateSearchKeyWord = (e) => {
		const searchKeyWord = e.target.value;
		this.setState({ searchKeyWord });
	}

	handleMenuClick(option) {
		this.setState({ selectedSortingOption: option.key });
	}

	processLocations = () => {
		let result = this.searchLocations();
		result = this.sortLocations(result);
		return result;
	}

	searchLocations = () => {
		return this.state.locations.filter(location => location.name.toLowerCase().includes(this.state.searchKeyWord.toLowerCase()))
	}

	sortLocations = (locations) => {
		if (this.state.selectedSortingOption === "1") {
			return locations;
		} else if (this.state.selectedSortingOption === "2") {
			return locations.sort((a, b) => {
				const aCleanName = a.name.replace('The ', '').trim();
				const bCleanName = b.name.replace('The ', '').trim();
				if (aCleanName > bCleanName)
					return 1;
				else
					return -1;
			})
		} else if (this.state.selectedSortingOption === "3") {
			return locations.sort((a, b) => {
				const aRating = this.getAverageRating(a.ratings);
				const bRating = this.getAverageRating(b.ratings);
				if (aRating > bRating)
					return -1;
				else
					return 1;
			})
		} else if (this.state.selectedSortingOption === "4") {
			return locations.sort((a, b) => {
				const aLastUpdate = a.priceUpdates.length > 0 ? a.priceUpdates.slice(-1)[0] : null;
				const bLastUpdate = b.priceUpdates.length > 0 ? b.priceUpdates.slice(-1)[0] : null;
				if (aLastUpdate === null && bLastUpdate === null)
					return 0;
				else if (aLastUpdate === null && bLastUpdate !== null)
					return 1;
				else if (aLastUpdate !== null && bLastUpdate === null)
					return -1;
				else if (moment(aLastUpdate).isAfter(bLastUpdate))
					return 1;
				else
					return -1;
			})
		}
	}

	getAverageRating = (ratingArray) => {
		if (ratingArray.length === 0) {
			return 0;
		} else {
			return ratingArray.reduce((a, b) => { return a + b }, 0) / ratingArray.length;
		}
	}

	updateViewImage(e) {
		this.setState({ compactView: e.target.checked })
	}

	render() {
		const sortMenu = (
			<Menu onClick={this.handleMenuClick} defaultSelectedKeys={["2"]} selectedKeys={[this.state.selectedSortingOption]}>
				{/* <Menu.Item key="1"><Icon type="dollar" />Cover Price ($ - $$$)</Menu.Item> */}
				<Menu.Item key="2"><Icon type="sort-ascending" />Name (A - Z)</Menu.Item>
				<Menu.Item key="3"><Icon type="fire" />Hotness (🔥 - 👎🏻)</Menu.Item>
				<Menu.Item key="4"><Icon type="clock-circle" />Most Recently Updated</Menu.Item>
			</Menu>
		);

		const processedLocations = this.processLocations();

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
							onChange={this.onUpdateSearchKeyWord}
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
					{
						this.state.loading &&
						<div className="loading-state">
							<Spin size="large" />
						</div>
					}
					{
						(processedLocations.length === 0 && !this.state.loading)
						&&
						<div className="empty-state">
							<Icon type="coffee" />
							<h3>We can't find any matching places.<br />You may have to drink coffee tonight 🙂</h3>
						</div>
					}
					<div className="cards-collection">
						{
							processedLocations.map(location => {
								return (<BarCard
									key={location._id}
									compactView={this.state.compactView}
									locationInfo={location}
									onUpdate={this.getAllLocationsInfo}
								/>)
							})
						}
					</div>
				</div>
				<div className="footer">
					<div>Rebel Radar © - VolHacks 2018</div>
					<Button shape="circle" icon="github" target="_blank" href="https://github.com/tamntn/rebelradar" />
				</div>
			</div>
		);
	}
}

export default App;