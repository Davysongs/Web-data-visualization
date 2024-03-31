#!/bin/bash

# Install Python
# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python not found, installing..."
    # Install Python using a different method, such as pyenv or directly downloading
    # For example, if using pyenv:
    curl https://pyenv.run | bash
    export PATH="/root/.pyenv/bin:$PATH"
    eval "$(pyenv init --path)"
    pyenv install 3.9.0
    pyenv global 3.9.0
else
    echo "Python already installed."
fi

# Install pip
# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "Pip not found, installing..."
    # Install pip using another method
    # For example, if using get-pip.py:
    curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
    python3 get-pip.py
else
    echo "Pip already installed."
fi

# Install dependencies
pip3 install -r requirements.txt

# Run the Django migrations or any other setup commands
# Additional setup commands if needed

# Build your Django app or collect static files
# For example:
python3 manage.py collectstatic --noinput
