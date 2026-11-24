
pipeline {
    agent any

    parameters {
        choice(
            name: 'TEST_TARGET',
            choices: [
                'all-tests',
                'login',
                'create-playground',
                'create-lead',
                'convert-lead',
                'create-task',
                'complete-task',
                'manage-opportunity'
            ],
            description: 'Select the Playwright test to execute'
        )
    }

    stages {
        stage('Checkout GitHub Repository') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npm run ${TEST_TARGET}'
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**',
                allowEmptyArchive: true
            )
        }
        success {
            echo 'Playwright tests completed successfully!'
        }
        failure {
            echo 'Playwright tests failed. Check the console output.'
        }
    }
}
