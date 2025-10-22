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
        bat """
          if exist %DIST_DIR% rmdir /s /q %DIST_DIR%
          mkdir %DIST_DIR%
          xcopy /E /I /Y *.html %DIST_DIR%\\
          xcopy /E /I /Y assets %DIST_DIR%\\assets\\
        """
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
          // Get a free port dynamically on Windows using Python
          def portCmd = 'python -c "import socket; s=socket.socket(); s.bind((\\\"\\\",0)); print(s.getsockname()[1]); s.close()"'
          def WEB_PORT = bat(script: portCmd, returnStdout: true).trim()

          echo "Found free port: ${WEB_PORT}"
          echo "Starting local web server on port ${WEB_PORT}..."

          // Run web server in background
          bat "start /B python -m http.server ${WEB_PORT} --directory ${DIST_DIR}"

          echo "✅ Site hosted at http://localhost:${WEB_PORT}/index.html"
        }
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished.'
