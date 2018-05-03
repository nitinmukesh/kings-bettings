var schema = new Schema({
    name: {
        type: String,
        index: true
    },
    size: {
        type: Number
    },
    storageName: {
        type: String,
        index: true
    },
    location: {
        type: String,
        index: true
    },
    downloadLink: {
        type: String,
        index: true
    },
    sizes: [{
        width: {
            type: String,
            index: true
        },
        height: {
            type: String,
            index: true
        },
        style: {
            type: String,
            index: true
        },
        storageName: {
            type: String,
            index: true
        }
    }]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Upload', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    convertUploadObj: function (uploadObject) {
        var obj = {
            name: uploadObject.filename,
            size: uploadObject.size,
            storageName: uploadObject.fd,
            location: uploadObject.extra.Location,
            downloadLink: uploadObject.extra.mediaLink
        };
        return obj;
    },
    findFile: function (fileObj, callback) {
        if (fileObj || fileObj.file) {
            Upload.findOne({
                _id: fileObj.file
            }, function (err, data) {
                if (err || _.isEmpty(data)) {
                    callback(err);
                } else {
                    if (fileObj.width || fileObj.height) {
                        Upload.generateFile(data, fileObj, callback);
                    } else {
                        callback(null, data);
                    }
                }
            });
        }
    },
    generateFile: function (data, fileObj, callback) {
        var resizeVal = {};
        if (fileObj.width && !_.isNaN(parseInt(fileObj.width))) {
            resizeVal.width = parseInt(fileObj.width);
        } else {
            resizeVal.width = Jimp.AUTO;
            fileObj.width = 0;
        }
        if (fileObj.height && !_.isNaN(parseInt(fileObj.height))) {
            resizeVal.height = parseInt(fileObj.height);
        } else {
            resizeVal.height = Jimp.AUTO;
            fileObj.height = 0;
        }
        if ((fileObj.style == "cover" || fileObj.style == "contain" || fileObj.style == "resize") && (fileObj.width && !_.isNaN(parseInt(fileObj.width)) && fileObj.height && !_.isNaN(parseInt(fileObj.height)))) {
            resizeVal.style = fileObj.style;
        } else {
            resizeVal.style = "scaleToFit";
            fileObj.style = "scaleToFit";
        }
        var finalObject = _.find(data.sizes, function (size) {
            return (size.width == fileObj.width && size.height == fileObj.height && size.style == fileObj.style);
        });
        if (finalObject) {
            callback(null, finalObject);
        } else {
            Jimp.read(data.location, function (err, image) {
                image[resizeVal.style](resizeVal.width, resizeVal.height).quality(60).getBuffer(image.getMIME(), function (err, buffer) {
                    fileObj.storageName = md5(JSON.stringify(fileObj)) + data.storageName;
                    var file = storage.bucket(storageBucket).file(fileObj.storageName);
                    var wstream = file.createWriteStream({
                        metadata: {
                            contentType: image.getMIME(),
                        },
                        public: true
                    });
                    wstream.write(buffer);
                    wstream.end();
                    wstream.on('finish', function () {
                        data.sizes.push(fileObj);
                        data.save();
                        callback(null, fileObj);
                    });
                });
            });
        }
    }
};

module.exports = _.assign(module.exports, exports, model);