#!/usr/bin/env sh
#consul watch -type=service --service=jenkins ./service-watch-script-py 
touch scripts/consul_watch.log
exec >> scripts/consul_watch.log
IFS=" "
while read a
do
    echo $a
done