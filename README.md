# mydataapp

## manual setup
1) launch jenkins
cmd: systemctl start jenkins sudo systemctl enable jenkins

jenkins available at http://localhost:8080/

2) launch docker desktop

3) launch minikube
cmd: minikube start --driver=docker --force

4) launch minikube ui 
cmd: minikube dashboard

minikube dashboard available at http://127.0.0.1:<какой-то порт>/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/#/pod?namespace=mydataapp

5) deploy backend to minikube
cmd: minikube image build -t postgres-java-app_app:latest .
(run from postgres-java-app dir)

cmd: minikube image load postgres-java-app_app:latest --overwrite=true

cmd: kubectl apply -f mydataapp-namespace.yaml
(run from k8s dir)

cmd: kubectl apply -f . --recursive || true
(run from k8s dir)

6) access backend rest api from local
6.1) launch port forwarding from backend pod to local
cmd: kubectl port-forward -n mydataapp svc/backend-service 8085:8085

backend api available at http://localhost:8085/api/v1/getall

or

6.2)  launch port forwarding from ingress controller to local
cmd: minikube addons enable ingress
cmd: kubectl port-forward -n ingress-nginx service/ingress-nginx-controller 8086:80

backend api available at http://localhost:8086/api/v1/getall

curl -kvvv -H "Host: mydataapp.app" http://localhost:8086/api/v1/getall
(we're replacing host header from localhost:8086 to mydataapp.app that we stated in ingress yaml)