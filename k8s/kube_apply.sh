#!/bin/bash

# Script to apply all YAML files in the current directory to Kubernetes

# Enable strict error handling
set -e

echo "Starting Kubernetes resource deployment..."

# Count files for progress tracking
total_files=$(find . -maxdepth 1 -name "*.yaml" -o -name "*.yml" | wc -l)
counter=0

echo "Found $total_files YAML file(s) to process"

# Loop through all YAML/yml files in the current directory
for file in *.yaml *.yml; do
    # Skip if no files match the pattern
    [ -e "$file" ] || continue
    
    # Increment counter
    counter=$((counter + 1))
    
    echo "Processing file $counter of $total_files: $file"
    
    # Apply the YAML file
    kubectl apply -f "$file"
    
    # Optional: add a small delay between files to avoid overwhelming the API server
    # sleep 1
    
    echo "Applied: $file"
    echo "---"
done

echo "Deployment completed! Successfully applied $counter file(s)."