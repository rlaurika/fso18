# Phonebook backend app

This is a super simple API that serves some phonebook data (name, number).
Made as an exercise for the University of Helsinki Full stack open 2018 course:
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
https://phonebook-backend-fso18.rahtiapp.fi/api/persons

This is hosted on CSC's Rahti platform: https://rahti.csc.fi