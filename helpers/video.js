const fs  = require('fs');

module.exports.getVideo = (range) => {

    const videoPath = './public/videos/GraphQL.mp4';
    const videoSize = fs.statSync(videoPath).size;

    const chunkSize = 1 * 1e+6;
    const start     = Number(range.replace(/\D/g, ''));
    const end       = Math.min(start + chunkSize, videoSize - 1);

    const contentLength = end - start + 1;

    const headers = {
        "Content-Range"  : `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges"  : 'bytes',
        "Content-Length" : contentLength,
        "Content-Type"   : "video/mp4"
    }

    const stream = fs.createReadStream(videoPath, {start, end});

    return {
        headers,
        stream
    };
}