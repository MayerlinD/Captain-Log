|    URL          |  HTTP Verb    |   Action    |   Method               | View |
| --------------- | ------------- | ------------|-------------           | --------------|
| /fruits/        |    GET        |  Index      |  Fruit.find            |    Index.jsx  |
|/fruits/new      |    GET        |   New       |  none                  |    New.jsx    |
| /fruits/:id     |    Delete     |  Destroy    |Fruit.findByIdAndRemove |    none       |
| /fruits/:id     |   PATCH/PUT   |  Update     |Fruit.findByIdAndUpdate|    none       |
| /fruits         |   POST        |  Create     |Fruit.create            |    none       |
| /fruits/:id/edit|   GET         |  Edit       |Fruit.findOne           |    Edit.jsx   |
| /fruits/:id     |   GET         |  Show       |Fruit.findOne           |    Show.jsx   |
