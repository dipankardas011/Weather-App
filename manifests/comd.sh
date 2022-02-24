#!/bin/bash

kubectl apply -f ./manifests/deploy.yaml
kubectl expose -f ./manifests/deploy.yaml
kubectl get services
kubectl port-forward services/weatherapp 8080:80
# http://localhost:8080/