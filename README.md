# mydataapp

## manual setup
1) launch jenkins <br>

cmd: systemctl start jenkins sudo systemctl enable jenkins <br>

jenkins available at http://localhost:8080/

2) launch docker desktop <br>

3) launch minikube <br>

cmd: minikube start --driver=docker --force <br>

4) launch minikube ui <br>

cmd: minikube dashboard <br>

minikube dashboard available at http://127.0.0.1:<какой-то порт>/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/#/pod?namespace=mydataapp

5) deploy backend to minikube <br>

cmd: minikube image build -t postgres-java-app_app:latest . 
(run from postgres-java-app dir) <br>

cmd: minikube image load postgres-java-app_app:latest --overwrite=true <br>

cmd: kubectl apply -f mydataapp-namespace.yaml
(run from k8s dir) <br>

cmd: kubectl apply -f . --recursive || true
(run from k8s dir) <br>

6) access backend rest api from local <br>

6.1) launch port forwarding from backend pod to local <br>

cmd: kubectl port-forward -n mydataapp svc/backend-service 8085:8085 <br>

backend api available at http://localhost:8085/api/v1/getall <br>

or <br>

6.2)  launch port forwarding from ingress controller to local <br>

cmd: minikube addons enable ingress <br>

cmd: kubectl port-forward -n ingress-nginx service/ingress-nginx-controller 8086:80 <br>

backend api available at http://localhost:8086/api/v1/getall <br>

curl -kvvv -H "Host: mydataapp.app" http://localhost:8086/api/v1/getall <br>
(we're replacing host header from localhost:8086 to mydataapp.app that we stated in ingress yaml)