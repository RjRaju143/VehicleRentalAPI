pipeline {
	agent any
		stage('One'){
			steps{
				echo "Hi, this is One"
			}
		}
		stage('Two'){
			steps{
				echo "Hi, this is Tne"
			}
		}
		stage('Three'){
			steps{
				echo "Hi, this is Three"
			}
		}
		stage('Four'){
			parallel {
				stage('Unit Test'){
					steps {
						echo "Running the unit test..."
					}
				}
				stage('Integration Test'){
					agent {
						docker {
							reuseNode true
							image 'ubuntu'
						}
					}
					steps {
						echo "Running the Integration test..."
					}
				}
			}
		}
}