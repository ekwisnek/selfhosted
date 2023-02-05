# Deploy NATS with Monitoring

Deploy the Helm chart with included values file:
```
$ helm install nats nats/nats -f values.yaml --namespace=nats --create-namespace
```
Deploy monitoring:
>_NOTE:_ This assumes you have the Prometheus operator already installed in your Kubernetes cluster.
```
$ kubectl create -f monitoring/monitoring.yaml
$ helm install grafana grafana/grafana -f grafana-values.yaml
```