pipeline {
    agent any
    
    environment {
        MINIKUBE_HOME = '/tmp/jenkins-minikube'
    }

    stages {
        stage('Setup') {
            steps {
                sh '''
                    # Clean up
                    minikube delete 2>/dev/null || true
                    rm -rf /tmp/jenkins-minikube 2>/dev/null || true

                    # Create directory
                    mkdir -p /tmp/jenkins-minikube
                    chmod 755 /tmp/jenkins-minikube
                '''

                git url: 'https://github.com/KrivitskayaAnna/myapp.git', branch: 'master'
            }
        }

        stage('Start Minikube with Internal Docker') {
            steps {
                script {
                    echo "🚀 Starting Minikube with built-in Docker..."

                    sh '''
                        export MINIKUBE_HOME=/tmp/jenkins-minikube

                        # Start minikube with container runtime (not docker driver)
                        minikube start --driver=docker --container-runtime=containerd

                        # Wait for it to be ready
                        sleep 60

                        # Check status
                        minikube status

                        # Show docker info inside minikube
                        minikube ssh "docker version" || true
                    '''
                }
            }
        }

        stage('Build Images Using Minikube') {
            steps {
                script {
                    echo "🔨 Building images with minikube image build..."

                    sh '''
                        # Build directly in minikube (this is the key fix)
                        minikube image build -t frontend-app_frontend:latest ./frontend-app

                        # Verify
                        minikube image ls | grep frontend

                        # Build backend
                        minikube image build -t postgres-java-app_app:latest ./postgres-java-app

                        # Verify
                        minikube image ls | grep postgres-java
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh '''
                        kubectl apply -f k8s/

                        # Wait for deployments
                        sleep 30

                        # Show status
                        kubectl get all -n mydataapp

                        # Get service URLs
                        echo "Services:"
                        minikube service list -n mydataapp
                    '''
                }
            }
        }
    }

    post {
        always {
            echo "✅ Pipeline completed"
            sh 'minikube status'
        }
    }
}