#!/usr/bin/env sh
touch scripts/consul_watch.log
exec >> scripts/consul_watch.log
IFS=" "
while read a
do
    echo $a
done