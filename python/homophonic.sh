#! /bin/sh
value=`cat $1`
for word in $value; do python /usr/local/bin/listener-arpa-guess $word >> /var/www/html/scratch/$2; done
echo $filehash
