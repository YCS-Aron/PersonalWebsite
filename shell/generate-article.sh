#!/bin/sh
echo "start..."
IFS=' '
rm code.html
if [ ! -f "code.html" ]; then    
#  不能是 if [ ! -f "code.html" ]; then
	touch "code.html" 
fi 

count=$(cat code.txt|wc -l)
echo $count

echo "<div class=\" code-block\">" >> code.html

echo "<div class=\" num-section\">" >> code.html
i=0
cat code.txt | while read myline  
do   
    echo "<div><span>"$i"</span></div>" >> code.html
    i=$[i+1]
done 
echo "</div>" >> code.html

echo "<div class=\"code-section\">" >> code.html
cat code.txt | while read myline  
do   
	echo "<div class=\"code-line\">" >> code.html
    echo "<span>" >> code.html
    # echo -n $myline >> code.html
    # echo -n '<span>' >> code.html
    echo $myline >> code.html
    echo "</span>" >> code.html
    echo "</div>" >> code.html
done 
echo "</div>" >> code.html

echo "</div>" >> code.html
