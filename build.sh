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
cd frontend
npm install
cd ..
echo ""
echo ""
echo "[SH]"
echo "[SH] ---------------------------------------------------------"
echo "[SH] Build backend"
echo "[SH] ---------------------------------------------------------"
echo ""
echo ""
cd backend
mvn clean install
cd ..
echo ""
echo ""
echo "[SH] ---------------------------------------------------------"
echo "[SH] Backend build is completed"
echo "[SH] ---------------------------------------------------------"
echo "[SH]"
echo "[SH]"
echo "[SH]"
read -p "[SH] Press any key to exit ..."