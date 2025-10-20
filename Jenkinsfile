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
stage('Prepare') {
steps {
script {
// Create dist and copy files there
if (isUnix()) {
sh "rm -rf ${DIST_DIR} && mkdir -p ${DIST_DIR} && cp -r *.html assets ${DIST_DIR}/"
} else {
bat "if exist ${DIST_DIR} rmdir /s /q ${DIST_DIR} && mkdir ${DIST_DIR} && xcopy /E /I /Y *.html ${DIST_DIR}\\"
bat "xcopy /E /I /Y assets ${DIST_DIR}\\assets\\"
}
}
}
}
stage('Archive') {
steps {
archiveArtifacts artifacts: 'dist/**', fingerprint: true
}
}
}
post {
always {
echo 'Pipeline finished.'
}
}
}