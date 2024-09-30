


gcloud builds submit --project pragmatic-parking-dev --config cloudbuild.yaml --substitutions=$(gcloud beta builds triggers describe lott-pay-frontend-deploy	 --format json  --project pragmatic-parking-dev | jq -r '.substitutions | to_entries | map(.key + "=" + (.value | tostring)) |  join(",")')
