curl --request PUT \
    --data @/Users/manny/git/misc/consul/service/jenkins.json \
    http:/127.0.0.1:8500/v1/agent/service/register