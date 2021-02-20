const aws = require('aws-sdk')
const ddb = new aws.DynamoDB.DocumentClient()

const readModel = async (key, table, keyName = 'id', indexName = undefined) => {
  let params = {
    TableName: table,
    KeyConditionExpression: `${keyName} = :key`,
    ExpressionAttributeValues: {
      ':key': key
    }
  }
  if (indexName) {
    params.IndexName = indexName
  }
  try {
    const { Items } = await ddb.query(params).promise()
    return Items
  } catch (error) {
    console.log('DynamoDB Error: ', error)
    return null
  }
}
module.exports = readModel
