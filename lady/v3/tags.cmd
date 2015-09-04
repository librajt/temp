@echo off
echo node pack -p feed -c v3 -v [-v] -b [-b]
set /p v=   [-v] = ? 
set /p b=   [-b] = ? 
node ../../lib/pack/pack -p feed -c v3 -v %v% -b %b%

pause