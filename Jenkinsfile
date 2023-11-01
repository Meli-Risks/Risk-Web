pipeline {
    agent any

    options {
        withFolderProperties()
    }

    stages {
        stage('Deploy') {
            steps {
                sh 'docker stop risk-web || true && docker rm risk-web || true'
                sh 'docker rmi risk-web-image || true'
                sh 'docker build -t risk-web-image .'
                sh "docker create --name risk-web -p 8091:80 risk-web-image"
                sh 'docker start risk-web'
            }
        }
    }
    post {
        failure {
            emailext body: 'Test Complete Build failed', recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], subject: "Build failed: ${currentBuild.fullDisplayName}"
        }
    }
}
