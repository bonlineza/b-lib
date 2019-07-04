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
            sendBuildNotificationToSlack(true, currentBuild)
        }
        unsuccessful {
            sendBuildNotificationToSlack(false, currentBuild)
        }
        always {
            dir ('node_modules'){
                deleteDir();
            }
            cleanWs()
        }
    }
}

def sendBuildNotificationToSlack(boolean successful, org.jenkinsci.plugins.workflow.support.steps.build.RunWrapper build){
    def colorName = "danger"
    def title = successful ? "SUCCESS" : "FAILURE"

    def subject = "${title}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
    def summary = "${subject} after ${build.durationString} (${env.RUN_DISPLAY_URL})"

    if (successful) {
        colorName = "good"
    }
    slackSend(color: colorName, message: summary);
}

