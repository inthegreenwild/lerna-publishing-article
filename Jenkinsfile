pipeline {
    agent {
        label ''
    }
    tools {
        nodejs 'node-10'
    }
    stages {
        stage('scm') {
            steps {
                git branch: "${params.branch}", credentialsId: 'github', url: 'git@github.com:inthegreenwild/lerna-publishing-article.git'
                git config user.name ${params.user}
                git config user.email ${params.email}
            }
        }
        stage('build') {
            steps {
                sh '''
                    npm install
                    ./node_modules/.bin/lerna bootstrap --hoist
                    ./node_modules/.bin/lerna exec -- npm run build
                '''
            }
        }
        stage('publish canary') {
            when {
                expression { params.semver == 'prerelease' }
            }
            steps {

                sh """
                    ./node_modules/.bin/lerna publish prerelease --no-git-tag-version --preid=canary --npm-tag canary --y
                    ./node_modules/.bin/lerna version prerelease --no-git-tag-version --y
                """
                sh """
                    git add .
                    git commit -m "prerelease bump"
                    git push -u origin develop
                """
            }
        }
        stage('publish latst') {
            when {
                expression { params.semver != 'prerelease' }
            }
            steps {
                sh """
                    ./node_modules/.bin/lerna publish ${params.semver} --y
                    git checkout master
                    git checkout .
                    git clean -df
                    git merge ${params.branch} --no-ff -m "merge ${params.branch} to master" -X theirs
                    git push -u origin master
                """
            }
        }
    }
}