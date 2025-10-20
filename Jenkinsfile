pipeline {
  agent any
  environment {
    DIST_DIR = 'dist'
    WEB_PORT = '9090'
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
        echo "Starting local web server on port ${WEB_PORT}..."
        script {
          if (isUnix()) {
            sh "nohup python3 -m http.server ${WEB_PORT} --directory dist &"
          } else {
            bat "start /B python -m http.server ${WEB_PORT} --directory dist"
          }
        }
        echo "✅ Site hosted at http://localhost:${WEB_PORT}/index.html"
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished.'
    }
  }
}
