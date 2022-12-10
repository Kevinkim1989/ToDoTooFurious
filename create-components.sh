#!/bin/bash

# Define the components to create
components=(TaskList TaskForm TaskItem)

# Create a new file for each component
for component in ${components[@]}; do
  touch "src/${component}.jsx"
done

# Print the list of created files
ls -l src

