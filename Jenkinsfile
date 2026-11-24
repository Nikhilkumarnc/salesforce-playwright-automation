
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
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npm run %TEST_TARGET%'
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
