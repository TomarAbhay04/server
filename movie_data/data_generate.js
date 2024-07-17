import fs from 'fs';
import path from 'path';

// Function to convert an image to Base64
const imageToBase64 = (filePath) => {
  try {
    const file = fs.readFileSync(filePath);
    return file.toString('base64');
  } catch (err) {
    console.error(`Error converting ${filePath} to Base64:`, err);
    return null;
  }
};

// Example usage
const base64Image = imageToBase64('/path/to/your/image.jpg');
console.log(base64Image);
