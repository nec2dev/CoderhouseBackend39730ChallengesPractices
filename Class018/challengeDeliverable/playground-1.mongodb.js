// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('test');

// Create a new document in the collection.
db.getCollection('products').insertOne({
        "title": "TestItem010",
        "description": "This is a description for the item 010",
        "price": 2048000,
        "thumbnail": "./img/010Image.png",
        "code": "A1010",
        "stock": 2048,
        "category": "2",
        "status": true
});
