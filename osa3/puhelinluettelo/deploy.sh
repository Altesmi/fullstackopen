#!/bin/sh
npm run build
rm -rf ../../../fullstackPuhelinluettelo/build
cp -r build ../../../fullstackPuhelinluettelo/
