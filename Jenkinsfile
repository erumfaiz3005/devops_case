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

    stage('Deploy (Auto Web Port)') {
      steps {
        script {
          // Dynamically find a free port using Python
          def portCmd = isUnix() ?
            "python3 -c 'import socket; s=socket.socket(); s.bind((\"\",0)); print(s.getsockname()[1]); s.close()'" :
            "python -c \"import socket; s=socket.socket(); s.bind(('',0)); print(s.getsockname()[1]); s.close()\""
          def WEB_PORT = sh(script: portCmd, returnStdout: true).trim()

          echo "Found free port: ${WEB_PORT}"
          echo "Starting local web server on port ${WEB_PORT}..."

          if (isUnix()) {
            sh "nohup python3 -m http.server ${WEB_PORT} --directory ${DIST_DIR} &"
          } else {
            bat "start /B python -m http.server ${WEB_PORT} --directory ${DIST_DIR}"
          }

          echo "✅ Site hosted at http://localhost:${WEB_PORT}/index.html"
        }
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished.'
    }
  }
}
