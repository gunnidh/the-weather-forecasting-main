import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('weather-app-dynamo-db')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        table.put_item(Item=body)
        return {
            'statusCode': 200,
            'body': json.dumps('Item logged successfully')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error logging item: {}'.format(str(e)))
        }
