import Compressor from "image-compressor.js";

const resizeImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    const compressor = new Compressor();

    compressor.compress(file, {
      maxWidth,
      maxHeight,
      success(result) {
        resolve(result);
      },
      error(err) {
        reject(err);
      },
    });
  });
};

export default resizeImage;
