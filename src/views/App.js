import React, { Component } from 'react';
import logo from '../logo.svg';
import { Icon, Input } from 'antd';
import './App.css';
import BarCard from './BarCard';
import appLogo from '../image/logo.png';

const Search = Input.Search;

class App extends Component {
	render() {
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
						<Search
							placeholder="Search..."
							size="large"
						/>
					</div>
					<div className="cards-collection">
						<BarCard />
						<BarCard />
						<BarCard />
						<BarCard />
						<BarCard />
						<BarCard />
						<BarCard />
						<BarCard />
						<BarCard />
						<BarCard />
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
