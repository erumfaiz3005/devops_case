pipeline {
  agent any
  environment {
    DIST_DIR = 'dist'
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build') {
      steps {
        script {
          if (isUnix()) {
            sh """
              rm -rf ${DIST_DIR}
              mkdir -p ${DIST_DIR}
              cp -r *.html assets ${DIST_DIR}/
            """
          } else {
            bat """
              if exist ${DIST_DIR} rmdir /s /q ${DIST_DIR}
              mkdir ${DIST_DIR}
              xcopy /E /I /Y *.html ${DIST_DIR}\\
              xcopy /E /I /Y assets ${DIST_DIR}\\assets\\
            """
          }
        }
      }
    }

    stage('Archive') {
      steps {
        archiveArtifacts artifacts: 'dist/**', fingerprint: true
      }
    }

    stage('Deploy (Local Web Server)') {
      steps {
        echo "Starting simple local web server..."
        script {
          if (isUnix()) {
            sh 'nohup python3 -m http.server 8080 --directory dist &'
          } else {
            bat 'start /B python -m http.server 8080 --directory dist'
          }
        }
        echo "Site hosted at http://localhost:8080/index.html"
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished.'
    }
  }
}
