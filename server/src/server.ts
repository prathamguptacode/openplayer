import fs from 'fs';
import express, { type Request, type Response } from 'express';
import cors from 'cors'
const app = express();
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'hello world welcome to open player' });
});

app.get('/list', (req: Request, res: Response) => {
    // return res.json({ videoId: ['airplane', 'outdoor', 'reverse_shell', 'netflix', 'cycle', 'robowar', 'diwali', 'firework', 'mummaonbalcony', 'road_trip', 'bubble_soap'] });
    return res.json({
        videos: [
            {
                title: 'Mumma on home balcony and i am recording!!!',
                view: '6.57M',
                id: 'mummaonbalcony',
                duration: '0:11',
            },
            {
                title: 'Airplane taking off at a beatifull afternoon (nice and clear window view)',
                view: '12.45M',
                id: 'airplane',
                duration: '9:40',
            },
            {
                title: 'Lovely morning in Lucknow, nice park and nice view and nice nature',
                view: '21.34M',
                id: 'outdoor',
                duration: '2:41',
            },
            {
                title: 'how reverse shell actually works (how to reverse shell)',
                view: '1.21M',
                id: 'reverse_shell',
                duration: '7:02',
            },
            {
                title: 'So can you explain me the architecture of NETFLIX hahahaha? (AI Bullshit people throwing slop at you and you know it its wrong) REACTION VIDEO',
                view: '1.2B',
                id: 'netflix',
                duration: '21:59',
            },
            {
                title: 'Cycling in a farmhouse field, good good after and good cycle',
                view: '8.13M',
                id: 'cycle',
                duration: '1:19',
            },
            {
                title: 'Me in a robowar just like in big hero 6, robowar are always cool',
                view: '31.72M',
                id: 'robowar',
                duration: '1:20',
            },
            {
                title: 'Diwali! they are always so happening, fest of lights, i really like this day',
                view: '21.14M',
                id: 'diwali',
                duration: '0:30',
            },
            {
                title: 'Very Long, Very Loud chatati, reaction video',
                view: '9.26M',
                id: 'firework',
                duration: '0:58',
            },
            {
                title: 'My first road trip alone, Stop worrying about the potholes in the road and enjoy the journey',
                view: '94.23M',
                id: 'road_trip',
                duration: '15:24',
            },
            {
                title: 'DIY how to make bubble soap at home',
                view: '1.21M',
                id: 'bubble',
                duration: '7:18',
            },
        ],
    });
});

app.get('/video/:id', (req: Request, res: Response) => {
    const vid = req.params.id;
    const range = req.headers.range;
    if (!range) {
        return res.status(400).send('Requires Range header');
    }
    let videoPath;
    if (vid == 'mummaonbalcony') {
        videoPath = './uploads/mummaonbalcony.mp4';
    } else if (vid == 'airplane') {
        videoPath = './uploads/airplane.mp4';
    } else if (vid == 'outdoor') {
        videoPath = './uploads/outdoor.mp4';
    } else if (vid == 'reverse_shell') {
        videoPath = './uploads/reverse_shell.mp4';
    } else if (vid == 'netflix') {
        videoPath = './uploads/stream.mp4';
    } else if (vid == 'cycle') {
        videoPath = './uploads/cycle.mp4';
    } else if (vid == 'robowar') {
        videoPath = './uploads/robowar.mp4';
    } else if (vid == 'diwali') {
        videoPath = './uploads/diwali.mp4';
    } else if (vid == 'firework') {
        videoPath = './uploads/firework.mp4';
    } else if (vid == 'road_trip') {
        videoPath = './uploads/road_trip.mp4';
    } else if (vid == 'bubble') {
        videoPath = './uploads/bubble_soap.mp4';
    } else {
        return res.status(404).json({ message: 'video not found' });
    }
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    // Create headers
    const contentLength = end - start + 1;
    const headers = {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'video/mp4',
    };
    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);
    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });
    // Stream the video chunk to the client
    return videoStream.pipe(res);
});

app.get('/image/:id', (req: Request, res: Response) => {
    const imageId = req.params.id;
    let imgPath = '';
    if (imageId == 'mummaonbalcony') {
        imgPath = '/home/pratham/app/openplayer/server/uploads/mummaonbalcony.webp';
    } else if (imageId == 'airplane') {
        imgPath = '/home/pratham/app/openplayer/server/uploads/airplane.webp';
    } else if (imageId == 'outdoor') {
        imgPath = '/home/pratham/app/openplayer/server/uploads/outdoor.webp';
    } else if (imageId == 'reverse_shell') {
        imgPath = '/home/pratham/app/openplayer/server/uploads/reverse_shell.webp';
    } else if (imageId == 'netflix') {
        imgPath = '/home/pratham/app/openplayer/server/uploads/stream.webp';
    } else if (imageId == 'cycle') {
        imgPath = '/home/pratham/app/openplayer/server/uploads/cycle.webp';
    } else if (imageId == 'robowar') {
        imgPath = '/home/pratham/app/openplayer/server/uploads/robowar.webp';
    } else if (imageId == 'diwali') {
        imgPath = '/home/pratham/app/openplayer/server/uploads/diwali.webp';
    } else if (imageId == 'firework') {
        imgPath = '/home/pratham/app/openplayer/server/uploads/firework.webp';
    } else if (imageId == 'road_trip') {
        imgPath = '/home/pratham/app/openplayer/server/uploads/road_trip.webp';
    } else if (imageId == 'bubble') {
        imgPath = '/home/pratham/app/openplayer/server/uploads/bubble_soap.webp';
    } else {
        return res.status(404).json({ message: 'image not found' });
    }
    return res.sendFile(imgPath);
});

app.listen(3001, () => console.log('Server upp!!!!'));
