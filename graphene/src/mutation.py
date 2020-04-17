from graphene import Schema, ObjectType, String, Field, ID

from schema.create_minio_bucket import CreateMinioBucket
from schema.submit_run import SubmitRun

class Mutation(ObjectType):
  # Mutation type definition and resolver
  # Note using Field method here from object we expect
  create_minio_bucket = CreateMinioBucket.Field()
  # Called method from CreateMinioBucket class
  # so we can expect bucket_name argument
  def resolve_create_minio_bucket(parent, info, bucket_name):
    return {'bucket_name': bucket_name}

  submit_run = SubmitRun.Field()
  # def resolve_submit_run(parent, info, run_id):
  #   return run_id


