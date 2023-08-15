#!/bin/bash

# Ensures the package.json actually matches whats in node_modules
# yarn check --verify-tree

# if [ $? -eq 0 ]
# then
#   echo "The dependencies package.json are present in node_modules and have the right version."
# else
#   echo "The dependencies package.json are NOT present in node_modules or do NOT have the right version(s). Try rebuilding your yarn.lock file."
#   exit 1
# fi

# Ensures there are no duplicated packages
yarn yarn-deduplicate --list --fail

if [ $? -eq 0 ]
then
  echo "There are no duplicate packages in your yarn.lock file."
else
  echo "There are duplicated packages in your yarn.lock file, this can cause unexpected behaviour. Try running 'yarn yarn-deduplicate yarn.lock' to resolve this."
  exit 1
fi
