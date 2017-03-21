import React from 'react';
import Styles from './top_sales.scss';

class TopSalesList extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		var x =0;

		return (
			<div className = "topTenList">
				<h3 className = "listTitle">Top Sales Items</h3>
				<ol className = "topSalesList"> 
					{this.props.topTen.map(function(listValue){
						x++;
						return(
							<li key={x} className="listItem">
								<span className="itemNumber">{x}</span>
								<span className="itemContent">
									<p className="itemDescription">{listValue.description}</p>
									<p className="itemRevenue">${listValue.total_revenue}</p>
								</span>
							</li>
						);
					})}
				</ol>	
			</div>
		);
	}
}

export default TopSalesList;
