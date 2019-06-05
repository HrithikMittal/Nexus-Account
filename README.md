# Nexus Accounts [![HitCount](http://hits.dwyl.io/HrithikMittal/HrithikMittal/nexus-account.svg)](http://hits.dwyl.io/HrithikMittal/HrithikMittal/nexus-account)

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

### Repos for Seperate Access to the API's
<ul>
	<li><a href="https://github.com/HrithikMittal/Nexus-Budget">Budget API</a></li>
	<li><a href="https://github.com/HrithikMittal/Nexus-Inventory-Debit">Inventory-Debit</a></li>
	<li><a href="https://github.com/HrithikMittal/Nexus-Inventory">Inventory</a></li>
	<li><a href="https://github.com/HrithikMittal/Nexus-Maps">Maps API</a></li>
	<li><a href="https://github.com/HrithikMittal/Nexus-Ledger">Ledger</a></li>
	<li><a href="https://github.com/HrithikMittal/Nexus-Journal">Journal</a></li>
	<li><a href="https://github.com/HrithikMittal/Nexus-BalanceSheet">Balance Sheet</a></li>
	<li><a href="https://github.com/HrithikMittal/Nexus-Profit-Loss-Account">Profit and Loss Account</a></li>
	<li><a href="https://github.com/HrithikMittal/Nexus-Login-Signup">Login Signup</a></li>
	
</ul>

### Authentication 
I used express-session to manage sessions to authenticate. We have isUserLoggedIn,  isUserLoggedOut middleware function which checks if the user is authenticated or not. The session token is stored in the database using connect-mongo package and is deleted when the user logout<br>
```
async function isUserLoggedIn (req, res, next) {
  try {
    if (!(req.session && req.session.user)) {
      return res.status(401).send({
        error: "Unauthorized Access!"
      });
    }else {
      const user = await User.findOne({ _id : req.session.user._id })
      if(user) {
        next();
      } else {
        req.session.user = null;
        return res.status(401).send({
          error: "Unauthorized Access!"
        });
      }
    }
  } catch(e) {
    res.status(400).send({
      error: e
    })
  }
}


// Function to check whether the user is logged out
function isUserLoggedOut (req, res, next) {
  if (req.session && req.session.user) {
    return res.status(200).send({
      message: "User already Logged In!"
    });
  }
  next();
}

module.exports = {
  isUserLoggedIn,
  isUserLoggedOut
}
```
<i>Note: some of the APIs which are mentionted above are not authenticate so please remember to add it. So it will help to proctect the private routes.</i>

## Deployment

This api can be hosted on platform like heroku, aws, and others. MongoDB Atlas or Matlab can be used for remote database.<br /> For instance, the application can be deployed on [Heroku](https://signup.heroku.com/login) by creating and registering an account. Following, create a new app and choose a deployment method (terminal or github) and follow the instruction there. Remote database can be created using Mongodb Atlas or Matlab.<br /> For [Mongodb Atlas](https://cloud.mongodb.com/user?_ga=2.185306281.1809166196.1559570784-2125252051.1557828824#/atlas/register/accountProfile), you need to just to create your account and make a new cluster and link the cluster to your application through a URL. Following the given steps, you would have a remote application up and running.

## Contributing [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

If you are the helping and contributing one, your efforts and suggestion are always welcomed.
