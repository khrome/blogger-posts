#!/bin/sh
curl -L  http://www.cs.biu.ac.il/~koppel/blogs/blogs.zip > ../blogs.zip
cd ..
unzip blogs.zip
rm blogs.zip
cd scripts
