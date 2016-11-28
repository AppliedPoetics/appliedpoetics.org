SPACE_ID=nzeb81wqu39s
ACCESS_TOKEN=4a7629d16cb39091b96c90e651f9fc9bdfeb636e1de26fa8e7e3bfdfb34e70fc

curl -s -H "Authorization: Bearer ${ACCESS_TOKEN}" https://cdn.contentful.com/spaces/${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}

