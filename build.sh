#!/bin/bash

clear

echo "[SH] ---------------------------------------------------------"
echo "[SH] Multitlon building script, v 1.0.0"
echo "[SH] ---------------------------------------------------------"
echo "[SH]"
echo "[SH] ---------------------------------------------------------"
echo "[SH] Run maven build"
echo "[SH] ---------------------------------------------------------"
echo ""
echo ""
mvn clean install
echo ""
echo ""
echo "[SH] ---------------------------------------------------------"
echo "[SH] Maven build is completed"
echo "[SH] ---------------------------------------------------------"
echo "[SH]"
echo "[SH]"
echo "[SH]"
read -p "[SH] Press any key to exit ..."