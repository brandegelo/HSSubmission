import $ from 'jquery';
import ReactDOM from 'react-dom';
import TopSalesList from "../dist/TopSalesList/index.js";
import transformData from "../dist/Utils/transformData.js";
import request from 'request';
import React from 'React';	


request.get('http://localhost:3000/PurchaseOrders', function (error, response, body) {
  //console.log('body:', body); 

  var topTen = transformData(body);

  var placeholder = "placeholder2";

  ReactDOM.render(<TopSalesList topTen={topTen} />, document.getElementById('app'));
});


