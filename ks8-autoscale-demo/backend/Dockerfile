# Use official lightweight Python image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy app files into container
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 80
EXPOSE 80

# Start the Flask app
CMD ["python", "app.py"]