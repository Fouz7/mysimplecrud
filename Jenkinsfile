pipeline {
  agent any
  environment {
    SECRET_FILE_NEST = credentials("simplecrudnest-env")
  }
  tools {
    nodejs "NodeJS"
  }
  stages {
    stage("Environment Setup") {
      steps{
        dir("simplecrudnestjs") {
          script {
            withCredentials([file(credentialsId: "simplecrudnest-env", variable: "SECRET_FILE_NEST")]) {
              writeFile file: '.env', text: readFile(file: "${SECRET_FILE_NEST}")
            }
          }
        }
      }
    }
    stage("Build and Run Services") {
      steps {
        parallel (
          "run nest": {
            dir("simplecrudnestjs") {
              bat "npm install"
              bat "npm start"
            }
          },
          "run angular": {
            dir("simplecrudangular") {
              bat "npm install"
              bat "npm start"
            }
          }
        )
      }
    }
  }
}