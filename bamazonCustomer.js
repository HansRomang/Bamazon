var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "!Dottycat87",
	database: "bamazon_db"
});


connection.connect(function (err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	actualConnection();
});


function actualConnection() {

	connection.query("SELECT * FROM products", function (err, res) {

		if (err) throw err;

		var list = []
		for (var i = 0; i < res.length; i++) {
			var item = [
				res[i].item_id,
				res[i].product_name,
				res[i].price,
			];
			list.push(item)
		}

		console.table(["Item ID", "Products", "Price"], list);


		decideItem();
	});

}

function decideItem() {

	connection.query("SELECT * FROM products", function (err, results) {

		if (err) throw err;

		inquirer
			.prompt([
				{
					name: "itemchoice",
					type: "input",
					message: "Please input the item ID for what you'd like to purchase (1-10)"
				},
				{
					name: "amount",
					type: "input",
					message: "How much of this item would you like to purchase?"
				}
			]).then(function (answer) {

				var chosenItem;

				for (var i = 0; i < results.length; i++) {
					
					if (results[i].item_id === parseInt(answer.itemchoice)) {
						chosenItem = results[i];

					}
				}
				if (chosenItem.stock_quantity > parseInt(answer.amount)) {

					var revisedStock = chosenItem.stock_quantity - answer.amount;

					var total = parseFloat(answer.amount * chosenItem.price);

					var sales = chosenItem.product_sales + total;

					connection.query(
						"UPDATE products SET ?, ? WHERE ?",
						[
							{
								stock_quantity: revisedStock,
							},
							{
								product_sales: sales,
							},
							{
								item_id: chosenItem.item_id
							}
						],
						function (error) {
							if (error) throw err;
						}
					);
					console.log("Your Order " + answer.amount + " " + chosenItem.product_name + " has been purchased! Total: $" + total);
				}
				else {
					console.log("There's not enough of that item.");
				}
				runInquire();
			}
			)
	});
}



function runInquire() {
	inquirer
		.prompt([
			{
				name: "options",
				type: "rawlist",
				message: "What would you like to do next?",
				choices: ["Place More Orders", "Exit"]
			},
		]).then(function (answer) {
			switch (answer.options) {
				case "Place Another Order":
					decideItem();
					break;
				case "Exit":
					exit();
					break;
			}
		})
}

function exit() {
	connection.end()
}