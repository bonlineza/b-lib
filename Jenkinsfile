import java.util.UUID

pipeline {
    agent any

    tools {nodejs "10.14.2"}
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'ls ${WORKSPACE}'
                sh 'npm install -g yarn'
            }
        }

        stage('Setup') {
          steps {
            sh 'yarn install'
          }
        }

        stage('Running Tests and Building') {
            failFast true

            parallel {
                stage('Building Application') {
                    steps {
                        sh 'yarn build'
                    }
                }

                stage('Running Tests') {
                    steps {
                        sh 'yarn jest';
                    }
                 }

                 stage('Running Linter') {
                      steps {
                           sh 'yarn lint'
                      }
                  }
            }
        }
    }
    post {
        success {
            dir ('node_modules'){
                deleteDir();
            }
        }
        always {
            cleanWs()
        }
    }
}
