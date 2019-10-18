'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3()
const Busboy = require('busboy')
const listingPhotoService = require('../../services/listing-photo.service')
const r = require('../../helpers/response.utils')

module.exports.main = (event, context, callback) => {
  const { id } = event.pathParameters
  parser(event).then(() => {
    uploadFile(event.body.filename, event.body.file, id)
      .then((data) => 
      listingPhotoService.postListingPhoto({ listingId: id, url: data.Location })
        .then((data) => callback(null, r.success(data)))
        .catch((err) => callback(null, r.failure(err)))
      )
      .catch((err) => callback(null, r.failure(err)))
    });
}

const uploadFile = (filename, buffer, id) => new Promise((resolve, reject) => {
  const bucketName = "sandpit-spacenow-images";
  const folder = `listing-uploads/${id}/`
  const params = {
      Bucket: bucketName,
      Key: `${folder}${filename}`,
      Body: buffer,
  };
  s3.upload(params, (err, resp) => {
      if (!err) {
          resolve(resp);
      } else {
          reject(new Error('error during put'));
      }
  });
});

const getContentType = (event) => {
  const contentType = event.headers['content-type']
  if (!contentType) {
      return event.headers['Content-Type'];
  }
  return contentType;
};

const parser = (event) => new Promise((resolve, reject) => {
  const busboy = new Busboy({
      headers: {
          'content-type': getContentType(event)
      }
  });

  const result = {};

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      file.on('data', data => {
          result.file = data;
      });

      file.on('end', () => {
          result.filename = filename;
          result.contentType = mimetype;
      });
  });

  busboy.on('field', (fieldname, value) => {

      result[fieldname] = value;
  });

  busboy.on('error', error => reject(error));
  busboy.on('finish', () => {
      event.body = result;
      resolve(event);
  });

  busboy.write(event.body, event.isBase64Encoded ? 'base64' : 'binary');
  busboy.end();
});