#!/bin/bash

clear

echo "[SH] ---------------------------------------------------------"
echo "[SH] Multitlon building script, v 1.0.0"
echo "[SH] ---------------------------------------------------------"
echo "[SH]"
echo "[SH] ---------------------------------------------------------"
echo "[SH] Build frontend"
echo "[SH] ---------------------------------------------------------"
echo ""
echo ""
# cd frontend
# npm install
cd ..
echo ""
echo ""
echo "[SH]"
echo "[SH] ---------------------------------------------------------"
echo "[SH] Copy frontend to backend"
echo "[SH] ---------------------------------------------------------"

if [[ "$OSTYPE" == "win32" ]]; then
    xcopy frontend\\src backend\\src\\main\\resources\assets /s /y
elif [[ "$OSTYPE" == "win64" ]]; then
    xcopy frontend\\src backend\\src\\main\\resources\\assets /s /y
elif [[ "$OSTYPE" == "msys" ]]; then
    xcopy frontend\\src backend\\src\\main\\resources\\assets /s /y
else
    cp -r frontend\\src backend\src\main\resources\assets
fi

echo "[SH]"
echo "[SH] ---------------------------------------------------------"
echo "[SH] Build backend"
echo "[SH] ---------------------------------------------------------"
echo ""
echo ""
# cd backend
# mvn clean install
# cd ..
echo ""
echo ""
echo "[SH] ---------------------------------------------------------"
echo "[SH] Backend build is completed"
echo "[SH] ---------------------------------------------------------"
echo "[SH]"
echo "[SH]"
echo "[SH]"
read -p "[SH] Press any key to exit ..."