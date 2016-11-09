# AWS CodeDeploy - Setup

## Installation

ACHTUNG!!!
Unter der EC2-Instanz in der AWS Console unter Description muss bei IAM role etwas eingetragen sein, ansonsten muss man leider eine neue EC2-Instanz erstellen mit einer Rolle! Die angegebene Rolle muss auch die sein, die in Schritt 1 bearbeitet wird.

1. Erlaube der EC2-Instanz CodeDeploy zu verwenden
  * gehe unter IAM zu der Role, die der EC2-Instanz zugeordent ist bzw. erstelle eine neue Rolle, falls keine existiert und weise sie der Instanz zu
  * Unter Edit Trust Relationship der Role und passe region (eu-west-1) an:
  ```json
  ...
  "Principal": {
    "Service": [
      "ec2.amazonaws.com",
      "codedeploy.eu-west-1.amazonaws.com"
    ]
  },
  ...
  ```
  * Unter Permission der Role: Füge AmazonEC2RoleforAWSCodeDeploy & AmazonEC2FullAccess Policy hinzu


2. Installiere CodeDeploy-Agent unter Ubuntu auf EC2:
  * sudo apt-get install python-pip
  * sudo apt-add-repository ppa:brightbox/ruby-ng
  * sudo apt-get update
  * sudo apt-get install ruby2.0

  * Installiere AWS Command Line Interface: sudo apt-get install awscli
  * Konfiguriere unter gebe Credentials ein: aws configure
  * Lade Agent herunter: aws s3 cp s3://aws-codedeploy-eu-west-1/latest/install ./install-aws-codedeploy-agent --region eu-west-1
  * chmod +x ./install-aws-codedeploy-agent
  * sudo ./install-aws-codedeploy-agent auto
  * rm install-aws-codedeploy-agent
  * Check status: sudo service codedeploy-agent status
  * if not running: sudo service codedeploy-agent start


3. CodeDeploy Application anlegen
   - Erstelle unter IAM eine neue Role, die Zugriff auf S3 hat (bspw. AmazonS3FullAccess)
   - In der AWS Console eine neue CodeDeploy Application anlegen
   - Füge EC2 Instanz hinzu
   - Unter Service-Role füge die Role hinzu, die Zugriff auf S3 hat

4. Erstelle appspec.yml (bereits in git)

5. Erstelle S3 Bucket zum hochladen des Deployment Pakets (hier amos-deploy-dev)

## Deployment:
  * Hochladen: aws deploy push --application-name amos-app --s3-location s3://amos-deploy-dev/deployment --source ./
  * Es erschein ein Command mit dem man dann deployen kann: in unserem fall sind die folgenden Options:


    --application-name amos-app
    --s3-location bucket=amos-deploy-dev,key=deployment,bundleType=zip,eTAG=<ETAG>
    --deployment-group-name amos-master