project ?= nerdwise
version ?= auto

staging_s3_bucket = nerdwise-staging
prod_s3_bucket = nerdwise-prod

stage-s3:
	firebase deploy