const fs  = require('fs');

const getheaders = (start, end, videoSize) => {
    return {
        "Content-Range"  : `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges"  : 'bytes',
        "Content-Length" : end - start + 1,
        "Content-Type"   : "video/mp4"
    }
}

const getVideoDetails = (range) => {
    const videoPath = './public/videos/GraphQL.mp4';
    const videoSize = fs.statSync(videoPath).size;
    const chunkSize = 1 * 1e+6;
    const start     = Number(range.replace(/\D/g, ''));
    const end       = Math.min(start + chunkSize, videoSize - 1);

    return { videoPath, videoSize, chunkSize, start, end }
}

const init = (range) => {
    const videoDetails = getVideoDetails(range);
    const headers = getheaders(videoDetails.start, videoDetails.end, videoDetails.videoSize);
    const stream = fs.createReadStream(videoDetails.videoPath, { start : videoDetails.start, end : videoDetails.end});

    return {
        headers,
        stream
    };
}

module.exports = { init };