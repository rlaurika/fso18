# Phonebook app

This is a super simple API and a frontend that serves some phonebook data
(name, number). Made as an exercise for the University of Helsinki Full
stack open 2018 course:

http://mooc.fi/courses/2018/fullstack/

## Deploying in OpenShift

Here's an example on how to deploy this in OpenShift:

```bash
oc login <api url> --token=<secret token>
oc new-project fso18
oc new-app https://github.com/rlaurika/fso18 \
           --context-dir=osa3/puhelinluettelo_backend \
           -e PORT=8080
oc create route edge --hostname=<hostname> --service=fso18
```

## Example deployment

You can find this hosted here:
https://phonebook-fso18.rahtiapp.fi

The API is here:
https://phonebook-fso18.rahtiapp.fi/api/persons

This is hosted on CSC's Rahti platform: https://rahti.csc.fi

## Backup example deployment

Here's a backup deployment of the application hosted in OpenShift Online:
https://fso18-fso18.193b.starter-ca-central-1.openshiftapps.com/

And here's the API for the backup deployment:
https://fso18-fso18.193b.starter-ca-central-1.openshiftapps.com/api/persons