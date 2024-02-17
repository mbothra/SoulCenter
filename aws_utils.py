import boto3
from botocore.exceptions import NoCredentialsError

def upload_file_to_s3(file_name, bucket_name, object_name=None):
    """
    Upload a file to an S3 bucket and return the file URL.
    """
    if object_name is None:
        object_name = file_name

    s3_client = boto3.client('s3')
    try:
        s3_client.upload_file(file_name, bucket_name, object_name)
        location = s3_client.get_bucket_location(Bucket=bucket_name)['LocationConstraint']
        url = f"https://{bucket_name}.s3.{location}.amazonaws.com/{object_name}"
        return url
    except NoCredentialsError:
        print("Credentials not available")
        return None

def object_list(bucket_name='teletubby'):
    """
    List all objects in a given S3 bucket.
    """
    s3_client = boto3.client('s3')
    response = s3_client.list_objects_v2(Bucket=bucket_name)

    if 'Contents' in response:
        base_url = f"https://{bucket_name}.s3.amazonaws.com"
        objects = [f"{base_url}/{obj['Key']}" for obj in response['Contents']]
        return objects
    else:
        return []
