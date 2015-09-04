@echo off
echo node pack -p ##project## -c ##category## -v [-v] -b [-b]
set /p v=   [-v] = ? 
set /p b=   [-b] = ? 
node ../../lib/pack/pack -p ##project## -c ##category## -v %v% -b %b%

pause