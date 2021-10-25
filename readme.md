# mfws-client 
A node-js library wrapper for the M-Files Web Service.


*Please note that this library is provided "as-is" and with no warranty, explicit or otherwise.  You should ensure that the functionality meets your requirements, and thoroughly test them, prior to using in any production scenarios.*

*Also note that this is an un-official M-Files library*

The following helper library is provided as work-in-progress, and may not be fully complete.

This library aims to provide an easy-to-use C# wrapper for the [M-Files Web Service](http://www.m-files.com/MFWS/), which is part of the M-Files Web Access.  The user guide contains more information on [setting up M-Files Web Access](http://www.m-files.com/user-guide/latest/eng/#Configure_M-Files_Web_Access.html).

It must provide the following functionality:

* Authentication, both using credentials and using Windows Single Sign On
* Object creation
* File upload
* Vault extension method execution
* Searching

## NPM package

This library must be available [via NPM]().  The simplest way to get started with this library is to install the library in your nodejs application by running :
```javascript
npm install mfws-client
```
## Basic usage

This functionality is exposed by the `mfwsclient` object, which takes the URL of the M-Files Web Service in the constructor:

```javascript
// Instantiate a new MFWS client.
var client = new mfwsclient("http://m-files.mycompany.com");
```

The API provides both "Async" and blocking versions of most methods.  To use .NET Tasks and the async/await pattern, simply use the *Async version of the method (e.g. `AuthenticateUsingCredentialsAsync` instead of `AuthenticateUsingCredentials`).

## Authentication

three methods of authentication must be supported: authentication using credentials, and Windows Single Sign On.

## Authenticating using credentials

```javascript
// Instantiate a new MFWS client.
var client = new mfwsclient("http://m-files.mycompany.com");

//TBD
// Authentiate to a vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24} (clear credentials).
client.AuthenticateUsingCredentials
(
    "{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}",
    "MyUsername",
    "MyPassword",
	Guid.NewGuid.ToString() // Providing a session ID allows logout.
);
```

Note that the M-Files Web Service will provide authentication tokens even if the credentials are incorrect.  This is by design.

### Automatically expiring an authentication token

If no expiry information is provided, an authentication token will be valid indefinitely.  To set a specific expiry datetime, pass the datetime on the authentication call:

```javascript
// Instantiate a new MFWS client.
var client = new mfwsclient("http://m-files.mycompany.com");

//TBD
// Authentiate to a vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24} (clear credentials).
// Set the expiry as 10am UTC on 1st January 2017.
client.AuthenticateUsingCredentials
(
    "{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}",
    "MyUsername",
    "MyPassword",
    new DateTime(2017, 01, 01, 10, 00, 00, DateTimeKind.Utc)
);
```

Alternatively, to expire after a specified time from the initial authentication, provide a TimeSpan when authenticating:

```javascript
// Instantiate a new MFWS client.
var client = new mfwsclient("http://m-files.mycompany.com");

//TBD
// Authentiate to a vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24} (clear credentials).
// Set the expiry as 1 hour from initial authentication.
client.AuthenticateUsingCredentials(
    "{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}",
    "MyUsername",
    "MyPassword",
    TimeSpan.FromHours(1) );
```


## TBD : Authenticating using Windows Single Sign On

If using Windows Single Sign On, the application will use the current Windows identity that it is running under.  Note that [using Windows Single Sign On requires additional configuration](https://partners.cloudvault.m-files.com/Default.aspx?#CE7643CB-C9BB-4536-8187-707DB78EAF2A/object/75F59ED5-CC7F-4A0A-90D5-0F582D26E884/latest).

```javascript
// Instantiate a new MFWS client.
var client = new mfwsclient("http://m-files.mycompany.com");
//TBD
// Authentiate to a vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24}.
client.AuthenticateUsingSingleSignOn( "{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}" );
```

## TBD : Authenticating using OAuth 2.0 


## Searching

### TBD : Quick search

Simple searching can be done using the `SearchForObjectsByString` method.

Note that the search will only return items which you have access to, so ensure that you are authenticated (if required) prior to executing the method.

```javascript
// Connect to the online knowledgebase.
// Note that this doesn't require authentication.
var client = new mfwsclient("http://kb.cloudvault.m-files.com");

// Execute a simple search for the word "mfws".
var results = client.objectSearchOperations.searchForObjectsByString("mfws");

// Iterate over the results and output them.
console.log(`There were ${results.length} results returned.`);
foreach (var objectVersion in results)
{
	console.log(`${objectVersion.Title}`);
	console.log(`Type: ${objectVersion.ObjVer.Type}, ID: ${objectVersion.ObjVer.ID}`);
}
```

### TBD : Advanced / complex search

In addition to a simple quick search, the helper library allows the execution of more complex, or "advanced" searches using the `search` method.  This method accepts a collection of `IsearchCondition` objects which can be used to further constrain any search.

Note that the search will only return items which you have access to, so ensure that you are authenticated (if required) prior to executing the method.

```javascript
// Connect to the online knowledgebase.
// Note that this doesn't require authentication.
var client = new mfwsclient("http://kb.cloudvault.m-files.com");

// Execute an advanced search for the word "mfws", restricted to object type 0 (documents), which have a Document Date (property 1002) greater than 2015-11-01.
var results = client.objectSearchOperations.searchForObjectsByConditions(
	new quickSearchCondition("mfws"),
	new objectTypeSearchCondition(0),
	new datePropertyValueSearchCondition(1002, new Date('December 17, 1995 03:24:00'), searchConditionOperators.greaterThan)
);

// Iterate over the results and output them.
console.log(`There were ${results.Length} results returned.`);
foreach (var objectVersion in results)
{
	console.log(`${objectVersion.Title}`);
	console.log(`Type: ${objectVersion.ObjVer.Type}, ID: ${objectVersion.ObjVer.ID}`);
}
```



#### TBD : Restricting by text properties

For example, to restrict the search results by the value of a property with ID `1002`:

*Note that the library will handle ensuring items are correctly encoded.**

```javascript
// Create our search condition.
var condition = new textPropertyValueSearchCondition(1002, "ESTT");
```

If we wished to restrict by a text property with ID where the field contains `ESTT`, we would alter the operator:

```javascript
// Create our search condition.
var condition = new textPropertyValueSearchCondition(1002, "ESTT", searchConditionOperators.contains);
```

If we wished to restrict by a text property with ID where the field matches a [wildcard search for `ESTT*`](http://www.m-files.com/user-guide/latest/eng/#Quick_search.html), we would alter the operator:

```javascript
// Create our search condition.
var condition = new textPropertyValueSearchCondition(1002, "ESTT", searchConditionOperators.matchesWildcard);
```

#### Restricting by a boolean property

To restrict the search results by the value of a boolean property with ID `1050`:

```javascript
// Create our search condition.
var condition = new booleanPropertyValueSearchCondition(1050, true);
```

Alternatively, we could search for only objects where the property is false:

```javascript
// Create our search condition.
var condition = new booleanPropertyValueSearchCondition(1050, false);
```

#### Restricting by a numeric property (integer or real)

To restrict the search results by the value of a numeric property with ID `1100`:

```javascript
// Create our search condition.
var condition = new numericPropertyValueSearchCondition(1100, 123);
```

Alternatively, we could make use of a [different operator](#operators) to instead search for objects where the value is greater than 1000:

```javascript
// Create our search condition.
var condition = new numericPropertyValueSearchCondition(1100, 1000, searchConditionOperators.greaterThan);
```

#### Restricting by a date/time or timestamp property

To restrict the search results by the value of a date property with ID `1200`:

```javascript
// Create our search condition.
var condition = new datePropertyValueSearchCondition(1200, new Date('December 17, 1995 03:24:00'));
```

Alternatively, we could make use of a [different operator](#operators) to instead search for objects where the date is newer than 1st June 2017:

```javascript
// Create our search condition.
var condition = new datePropertyValueSearchCondition(1200, new Date('December 17, 1995 03:24:00'), SearchConditionOperators.GreaterThan);
```

#### Restricting by a lookup (single-select) property

To restrict the search results by the value of a single-select lookup property with ID `1500` that reference an object or value list item with ID 12345:

```javascript
// Create our search condition.
var condition = new lookupPropertyValueSearchCondition(1500, 12345);
```

#### Restricting by a multi-select lookup property

To restrict the search results by the value of a single-select lookup property with ID `1500` that reference an object or value list item with ID 12345:

*If there is only one value then this is the same as a single-select-lookup.*

```javascript
// Create our search condition.
var condition = new multiSelectLookupPropertyValueSearchCondition(1500, 12345);
```

To restrict objects to only objects which reference objects or value list items with *either* IDs 1, 2, 3, or 4:

```javascript
// Create our search condition.
var condition = new multiSelectLookupPropertyValueSearchCondition(1500, new [] { 1, 2, 3, 4 });
```

## TBD : Executing Vault Extension Methods

[Vault Extension Methods](http://developer.m-files.com/Built-In/VBScript/Vault-Extension-Methods/) are named sections of code, loaded into the M-Files vault, that can be executed using the M-Files API(s).  Vault Extension Methods can be executed using the [M-Files REST API](http://developer.m-files.com/APIs/REST-API/Vault-Extension-Methods/) by executing a correctly-formatted HTTP request.

The wrapper API exposes extension methods in a similar manner as the [COM API](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultExtensionMethodOperations~ExecuteVaultExtensionMethod.html):

```javascript
// Instantiate a new MFWS client.
var client = new mfwslient("http://m-files.mycompany.com");

// Authentiate to a vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24} (clear credentials).
client.authenticateUsingCredentials("{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}", "MyUsername", "MyPassword")

// Execute an extension method with the name "MyExtensionMethod", passing it the input string of "MyInputValue".
var output = client.ExtensionMethodOperations.executeVaultExtensionMethod("MyExtensionMethod", "MyInputValue");
```

## Creating objects

## Creating a new object

### Without files

This process can be used to create objects of any type (Document or anything else) that do not contain files.  The sample below shows a Document object being created

```javascript
// Instantiate a new MFWS client.
var client = new mfwslient("http://m-files.mycompany.com");

// Authentiate to a vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24} (clear credentials).
client.authenticateUsingCredentials("{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}", "MyUsername", "MyPassword")

//Create an ObjectCreationInfo containing the properties of the new object
var newObjectDetails = new ObjectCreationInfo()
{
	// Create the property values for the new object.
	propertyValues = new[] {
		new PropertyValue() {
			propertyDef = 100, // Built-in property definition of "class".
			typedValue = new TypedValue()
			{
				dataType = mfdatatype.Lookup,
				lookup = new Lookup()
				{
					Item = 0, // The id 0 is the default Document class lookup ID
					Version = -1
				}
			}
		},
		new PropertyValue()
		{
			// Property value 22 ("Single File Object") is required when creating a Document Object
			propertyDef = 22,
			typedValue = new TypedValue()
			{
				dataType = mfdatatype.Boolean,
				value = false // false = "multi-file-document" (it is not a SINGLE file document as it has zero files)
			}
		},
		new PropertyValue()
		{
			propertyDef = 0, // Property definition 0 (Name or Title) is the default title property
			typedValue = new TypedValue()
			{
				dataType = mfdatatype.Text,
				value = "Sample Title"
			}
		}
	}
};

// Create the object in the M-Files vault and return data about the new object.
var newObjectVersion = client.objectOperations.createNewObject(
						0, // 0 is the built-in object type of "Document"
						newObjectDetails);
```

## TBD : Checking an object in and out.

```javascript
// Instantiate a new MFWS client.
var client = new mfwslient("http://m-files.mycompany.com");

// Authentiate to a vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24} (clear credentials).
client.authenticateUsingCredentials("{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}", "MyUsername", "MyPassword")

// Check out the document (type ID 0) with ID 567.
var objID = new mFaaP.mfwslient.ObjID()
{
	type = 0,
	id = 567
};
var obj = client.objectOperations.checkOut(objID);

// Make a change to the object.
client.objectPropertyOperations.setProperty(obj.ObjVer, new PropertyValue()
{
	propertyDef = 1088, // The property ID 1088.
	typedValue = new MFaaP.mfwslient.TypedValue()
	{
		dataType = mfdatatype.Text,
		value = "hello world"
	}
});

// Check the object back in.
client.ObjectOperations.checkIn(obj.ObjVer);
```

### Undoing a checkout

```javascript
// Instantiate a new MFWS client.
var client = new mfwslient("http://m-files.mycompany.com");

// Authentiate to a vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24} (clear credentials).
client.authenticateUsingCredentials("{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}", "MyUsername", "MyPassword")

// Check out the document (type ID 0) with ID 567.
var objID = new MFaaP.mfwslient.ObjID()
{
	type = 0,
	id = 567
};
var obj = client.objectOperations.checkOut(objID);

// Undo the checkout.
client.objectOperations.undoCheckout(obj.ObjVer);
```

## Modifying object properties

### Updating properties

```javascript
// Instantiate a new MFWS client.
var client = new mfwslient("http://m-files.mycompany.com");

// Authentiate to a vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24} (clear credentials).
client.authenticateUsingCredentials("{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}", "MyUsername", "MyPassword")

// Check out the document (type ID 0) with ID 567.
var objID = new mFaaP.mfwslient.ObjID()
{
	type = 0,
	id = 567
};
var obj = client.objectOperations.checkOut(objID);

// Update a property on the object.
client.objectPropertyOperations.setProperty(obj.ObjVer, new PropertyValue()
{
	propertyDef = 1088, // The property ID 1088.
	typedValue = new mFaaP.mfwslient.TypedValue()
	{
		dataType = mfdatatype.Text,
		value = "hello world"
	}
});

// Check the object back in.
client.objectOperations.checkIn(obj.ObjVer);
```

### Removing properties

```javascript
// Instantiate a new MFWS client.
var client = new mfwslient("http://m-files.mycompany.com");

// Authentiate to a vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24} (clear credentials).
client.authenticateUsingCredentials("{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}", "MyUsername", "MyPassword")

// Check out the document (type ID 0) with ID 567.
var objID = new mFaaP.mfwslient.ObjID()
{
	type = 0,
	id = 567
};
var obj = client.objectOperations.checkOut(objID);

// Remove the property from the object.
client.objectPropertyOperations.removeProperty(obj.ObjVer, 1088);

// Check the object back in.
client.objectOperations.checkIn(obj.ObjVer);
```

## Deleting and undeleting an object

### Deleting

```javascript
// Instantiate a new MFWS client.
var client = new mfwslient("http://m-files.mycompany.com");

// Authentiate to a vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24} (clear credentials).
client.authenticateUsingCredentials("{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}", "MyUsername", "MyPassword")

// Delete the document (type ID 0) with ID 567.
var objID = new mFaaP.mfwslient.ObjID()
{
	type = 0,
	id = 567
};
client.objectOperations.deleteObject(objID);
```

### Undeleting

```javascript
// Instantiate a new MFWS client.
var client = new mfwslient("http://m-files.mycompany.com");

// Authentiate to a vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24} (clear credentials).
client.authenticateUsingCredentials("{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}", "MyUsername", "MyPassword")

// Delete the document (type ID 0) with ID 567.
var objID = new mFaaP.mfwslient.ObjID()
{
	type = 0,
	id = 567
};
client.objectOperations.undeleteObject(objID);
```