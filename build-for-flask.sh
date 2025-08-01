#!/bin/bash

echo "🏗️  Building Vue.js frontend for Flask production..."

# Build for production
npm run build

echo "📁 Moving build files to Flask backend..."
# Remove old dist folder if it exists in backend
rm -rf ../wscontest-backend/dist

# Copy the build output to backend directory
cp -r dist ../wscontest-backend/

echo "✅ Frontend built and ready for Flask!"
echo "💡 Run 'python app.py' in the wscontest-backend directory"
