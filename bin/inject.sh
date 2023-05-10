SENTINEL_FUSE=NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 
BLOB_LOCATION="dist/bootstrapper.blob"
BIN_LOCATION=${BLOB_LOCATION::-5}

echo "inject.sh :: injecting $BLOB_LOCATION into $BIN_LOCATION..."

pnpx postject $BIN_LOCATION NODE_SEA_BLOB $BLOB_LOCATION \
    --sentinel-fuse $SENTINEL_FUSE