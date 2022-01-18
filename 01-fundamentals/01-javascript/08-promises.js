const fs = require('fs');
const path = require('path');

const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

const appendFile = (filePath, currentContent , newContent) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, newContent, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({currentContent, newContent});
      }
    });
  });
}

const main = (filePath, newContent) => {
  return new Promise((resolve, reject) => {
    readFile(filePath)
      .then((data) => {
        return appendFile(filePath, data,newContent);
      })
      .then(({currentContent, newContent}) => {
        resolve(currentContent.toString() + newContent);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

main(
  path.join(__dirname, 'file.txt'),
  'This is a new line\n'
  )
  .then((newData) => console.log(
    newData.trim().split('\n').map((line, index) => `${index+1}: ${line}`)
  ))
  .catch((err) => console.log(err));