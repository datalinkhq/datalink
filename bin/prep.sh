echo "prep.sh :: preparing env for injection..."

mkdir dist 2>/dev/null
node --experimental-sea-config sea-config.json
cp $(command -v node) dist/bootstrapper