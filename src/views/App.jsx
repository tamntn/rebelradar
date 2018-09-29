import React, { Component } from 'react';
import axios from 'axios';
import { Input, Dropdown, Button, Icon, Menu, Checkbox, Spin } from 'antd';
import BarCard from './BarCard';
import appLogo from '../image/logo.png';
import '../style/App.css';

const loadingList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
		const matchedLocations = this.state.locations.filter(location => location.name.toLowerCase().includes(searchKeyWord.toLowerCase()))
		this.setState({ searchKeyWord })
	}

	handleMenuClick(option) {
		this.setState({ selectedSortingOption: option.key })
	}

	searchLocations = () => {
		return this.state.locations.filter(location => location.name.toLowerCase().includes(this.state.searchKeyWord.toLowerCase()))
	}

	sortLocations = (locations) => {

	}

	processLocations = () => {
		let result = this.searchLocations();
		return result;
	}

	updateViewImage(e) {
		this.setState({ compactView: e.target.checked })
	}

	render() {
		const sortMenu = (
			<Menu onClick={this.handleMenuClick} defaultSelectedKeys={["2"]} selectedKeys={[this.state.selectedSortingOption]}>
				<Menu.Item key="1"><Icon type="dollar" />Cover Price ($ - $$$)</Menu.Item>
				<Menu.Item key="2"><Icon type="sort-ascending" />Name (A - Z)</Menu.Item>
				<Menu.Item key="3"><Icon type="fire" />Hotness (🔥 - 👎🏻)</Menu.Item>
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