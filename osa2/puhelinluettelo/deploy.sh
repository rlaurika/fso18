#!/bin/sh
npm run build
rm -rf ../../osa3/puhelinluettelo_backend/build
cp -r build ../../osa3/puhelinluettelo_backend
