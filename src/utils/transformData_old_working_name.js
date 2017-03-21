import $ from 'jQuery';
import ld from 'lodash';

//feel free to use lodash; it provides alot of type methods that are native to other languages
//import {function} from 'lodash';

//transform data if needed here
var allSales = new Array();

export default function transformData(body) {
  var JSONData = JSON.parse(body);
  //console.log("All Orders: " + JSONData + "\nEND ALL ORDERS");

  $.each(JSONData, function(){
  	//console.log(this.purchase_order_id)
	$.each(this.products, function(){
		var productPrice = this.vendor_price.value/Math.pow(10, this.vendor_price.scale);
		var productRevenue = this.order_count*productPrice;
		var productID = this.or
		//console.log("Item Description: " + this.description);
		//console.log("	Total Item revenue: " + productRevenue);

		//get rid of any double quotes
		var conditionedDescription = this.description.replace(/['"]+/g, '');

		if (allSales.length < 1){
			// 0'th case
		 	allSales.push({"description" : conditionedDescription, "total_revenue" : productRevenue});
		} else {
			var foundIndex = ld.sortedIndexBy(allSales, {"description" : conditionedDescription}, function(o){return o.description;}); //THIS IS THE ONE THAT WORKS BIATCHHHHHHH
			if(allSales[foundIndex] && allSales[foundIndex].description === conditionedDescription){
				allSales[foundIndex].total_revenue = allSales[foundIndex].total_revenue + productRevenue;
				//now update the price table
			} else {
				//insert in order
				var itemToAdd = {"description" : conditionedDescription, "total_revenue": productRevenue};
				allSales.splice(foundIndex, 0, itemToAdd);

			}
		}
	});
 });

 var allSalesDecreasing = ld.orderBy(allSales, 'total_revenue', 'desc');

 //console.log(allSales);
 //console.log("qwer All Decreasing: " + allSalesDecreasing);

 var topTen = allSalesDecreasing.slice(0,10);
 console.log("TTTTOP TTTEN: " + topTen);

 var data = {

 	topTen
 };
    return topTen;
};