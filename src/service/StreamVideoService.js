import { spawn } from "node:child_process";
import { createReadStream } from "node:fs";
import { AvailableFilters } from "./../enums/AvailableFilters.js";

const start = (chosenFilter, request, response) => {
  response.writeHead(200, {
    'Content-Type': 'video/mp4'
  })

  const colorFilterToApply = getColorFilterToApply(chosenFilter);
  const spawnParams = getSpawnParams(colorFilterToApply);

  const ffmpeg = spawn('ffmpeg', spawnParams, {
    stdio: ['pipe', 'pipe', 'pipe']
  })

  createReadStream('media/video.mp4').pipe(ffmpeg.stdin);

  ffmpeg.stderr.on('data', msg => console.log(msg.toString()));

  ffmpeg.stdout.pipe(response);

  request.once('close', () => {
    ffmpeg.stdout.destroy();
    ffmpeg.stdin.destroy();
    ffmpeg.kill();

    console.log('disconnected!',)
  })
}

const getColorFilterToApply = (chosenFilter) => {
  switch (chosenFilter) {
    case AvailableFilters.MONOCHROME.NAME:
      return AvailableFilters.MONOCHROME.VALUE;

    case AvailableFilters.SEPIA.NAME:
      return AvailableFilters.SEPIA.VALUE;

    case AvailableFilters.RED.NAME:
      return AvailableFilters.RED.VALUE;

    default:
      return '';
  }
}

const getSpawnParams = (colorFilterToApply) => {
  let spawnParams = [
    '-i', 'pipe:0',
    '-f', 'mp4',
    '-movflags', 'frag_keyframe+empty_moov+default_base_moof',
    '-f', 'mp4',
    'pipe:1'
  ];

  if (colorFilterToApply) {
    spawnParams.splice(spawnParams.length - 1, 0, '-vf');
    spawnParams.splice(spawnParams.length - 1, 0, colorFilterToApply);
  }

  return spawnParams;
}

export {
  start
}