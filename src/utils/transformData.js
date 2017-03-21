import $ from 'jQuery';
import ld from 'lodash';

//feel free to use lodash; it provides alot of type methods that are native to other languages
//import {function} from 'lodash';

//transform data if needed here
var allSales = new Array();

export default function transformData(body) {
  var JSONData = JSON.parse(body);

  $.each(JSONData, function(){
	$.each(this.products, function(){
		var productPrice = this.vendor_price.value/Math.pow(10, this.vendor_price.scale);
		var productRevenue = this.order_count*productPrice;

		//get rid of any double quotes
		var conditionedDescription = this.description.replace(/['"]+/g, '');

		if (allSales.length < 1){
			// 0th case
		 	allSales.push({"description" : conditionedDescription, "productId" : this.product_id, "total_revenue" : productRevenue});
		} else {
			var foundIndex = ld.sortedIndexBy(allSales, {"description" : conditionedDescription}, function(o){return o.description;}); 
			
			// compare items by product ID
			if(allSales[foundIndex] && allSales[foundIndex].productId === this.product_id){
				allSales[foundIndex].total_revenue = allSales[foundIndex].total_revenue + productRevenue;
				//now update the price table
			} else {
				//insert in order
				var itemToAdd = {"description" : conditionedDescription, "productId" : this.product_id, "total_revenue": productRevenue};
				allSales.splice(foundIndex, 0, itemToAdd);

			}
		}
	});
 });

 var allSalesDecreasing = ld.orderBy(allSales, 'total_revenue', 'desc');

 var topTen = allSalesDecreasing.slice(0,10);
 console.log("Top Ten: " + topTen);

    return topTen;
};