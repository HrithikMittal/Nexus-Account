# Nexus Accounts

Nexus Account is an API which can be used to perform different accounting tasks such as creating Journal, Ledger, Trial Balance, Profit & Loss Account and Balance Sheet. It is also useful to create Flexible Budget or an Inventory.

### Prerequisites

To work with the api you must have to install the following:
* [NodeJS](https://nodejs.org/en/download/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [MongoDB Server](https://docs.mongodb.com/manual/installation/) - NoSql Database and server
* [Postman](https://www.getpostman.com/downloads/) - API development environment

## Installation

Before doing anything you have to clone or download(and unzip) the project folder, open terminal and navigate to the project folder and run:

```bash
npm install
```
This will install all the dependencies required by the project.

## Getting Started

To start using this API, start your local database server, open terminal and navigate to the project folder and run:
```bash
npm run start
```
If an error occur, check your database server or check if you have installed the prerequisites correctly.

If there was no error, open Postman and create and send a new get request to:

```
http://localhost:3000/
```
Expected Output: 
```
{
	message: "Welcome!"
}
```

Firstly, you have to create a new user for working with the API.

Send a post request to:

```
http://localhost:3000/user/register
```
Along with 'id' and 'password' field in the 'x-www-form-urlencoded' option for the body of the request in postman:
<table>
	<tr>
		<td>id</td>
		<td>demouserid</td>
	</tr>
	<tr>
		<td>password</td>
		<td>demo</td>
	</tr>
</table>

Expected Output: 
```
{
    "success": "User registered and Logged In!"
}
```

Once you get this message, you are ready to work with the api.
## Routes

Url for all these routes is ```http://localhost:3000``` and parameters for POST request are sent through 'x-www-form-urlencoded' method.

### User Routes

<table>
	<tr>
		<th>URL</th>
		<th>Parameters</th>
		<th>Method</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>/user/register</th>
		<td>
			<ul>
				<li>id</li>
				<li>password</li>
			</ul>
		</td>
		<td>
			POST
		</td>
		<td>
			Register a user
		</td>
	</tr>
	<tr>
		<td>/user/login</th>
		<td>
			<ul>
				<li>id</li>
				<li>password</li>
			</ul>
		</td>
		<td>
			POST
		</td>
		<td>
			Login a user
		</td>
	</tr>
	<tr>
		<td>/user/logout</th>
		<td>
			<ul>
				None
			<ul>
		</td>
		<td>
			POST
		</td>
		<td>
			Logout a user
		</td>
	</tr>
</table>

### Accounting Route

<table>
	<tr>
		<th>URL</th>
		<th>Parameters</th>
		<th>Method</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>/journal/add</th>
		<td>
			<ul>
				<li>from</li>
				<li>to</li>
				<li>date (MM/DD/YYYY)</li>
				<li>debit</li>
				<li>credit</li>
				<li>narration</li>
			</ul>
		</td>
		<td>
			POST
		</td>
		<td>
			Add new entry into journal
		</td>
	</tr>
	<tr>
		<td>/journal</th>
		<td>
			<ul>
				None
			</ul>
		</td>
		<td>
			GET
		</td>
		<td>
			Get all journal entry
		</td>
	</tr>
	<tr>
		<td>/journal/update</th>
		<td>
			<ul>
				<li>from</li>
				<li>to</li>
				<li>entryDate (MM/DD/YYYY)</li>
				<li>updateDate (MM/DD/YYYY)</li>
				<li>amount</li>
				<li>narration</li>
				<li>action ('increase' or 'decrease')</li>
			<ul>
		</td>
		<td>
			POST
		</td>
		<td>
			Update a journal entry
		</td>
	</tr>
	<tr>
		<td>/ledger/update</th>
		<td>
			<ul>
				None
			<ul>
		</td>
		<td>
			GET
		</td>
		<td>
			Update the ledger
		</td>
	</tr>
	<tr>
		<td>/ledger</th>
		<td>
			<ul>
				None
			<ul>
		</td>
		<td>
			GET
		</td>
		<td>
			Get ledger
		</td>
	</tr>
	<tr>
		<td>/trial</th>
		<td>
			<ul>
				None
			<ul>
		</td>
		<td>
			Get
		</td>
		<td>
			Get trial balance
		</td>
	</tr>
	<tr>
		<td>/final/pnl</th>
		<td>
			<ul>
				None
			<ul>
		</td>
		<td>
			GET
		</td>
		<td>
			Get Profit and Loss Account
		</td>
	</tr>
	<tr>
		<td>/final/balance</th>
		<td>
			<ul>
				None
			<ul>
		</td>
		<td>
			GET
		</td>
		<td>
			Get Balance Sheet
		</td>
	</tr>
</table>

### Flexible Budget Route

<table>
	<tr>
		<th>URL</th>
		<th>Parameters</th>
		<th>Method</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>/flexBudget/add</th>
		<td>
			<ul>
				<li>name</li>
				<li>type ("fixed" or "variable")</li>
				<li>cost (only if 'type' is "fixed")</li>
				<li>costPerUnit (only if 'type' is "variable")</li>
			</ul>
		</td>
		<td>
			POST
		</td>
		<td>
			Add an entry to budget
		</td>
	</tr>
	<tr>
		<td>/flexBudget</th>
		<td>
			<ul>
				<li>units (Number)</li>
			</ul>
		</td>
		<td>
			POST
		</td>
		<td>
			Get the flexible budget
		</td>
	</tr>
</table>

### Inventory Route

<table>
	<tr>
		<th>URL</th>
		<th>Parameters</th>
		<th>Method</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>/inventory/add</th>
		<td>
			<ul>
				<li>name</li>
				<li>category</li>
				<li>quantity</li>
				<li>thresholdQuantity</li>
				<li>expiry (format '05 September 2019')</li>
				<li>cost</li>
			</ul>
		</td>
		<td>
			POST
		</td>
		<td>
			Add an item to inventory
		</td>
	</tr>
	<tr>
		<td>/inventory/update</th>
		<td>
			<ul>
				<li>name</li>
				<li>category</li>
				<li>usedQuantity</li>
			</ul>
		</td>
		<td>
			POST
		</td>
		<td>
			Update an item in inventory
		</td>
	</tr>
	<tr>
		<td>/inventory</th>
		<td>
			<ul>
				None
			</ul>
		</td>
		<td>
			GET
		</td>
		<td>
			Get the inventory
		</td>
	</tr>
</table>
