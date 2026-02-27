require('dotenv').config();
const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.ELEVENLABS_API_KEY;
const ASSETS_DIR = path.join(__dirname, 'assets', 'audio');

if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

const musicTracks = [
    // Level 1: Forest / Energy
    { filename: 'L1_T1.mp3', prompt: 'Calm, atmospheric forest music with ethereal flute and acoustic guitar.' },
    { filename: 'L1_T2.mp3', prompt: 'Tense, rhythmic industrial clashing with nature sounds, tribal drums.' },
    { filename: 'L1_T3.mp3', prompt: 'Tragic, slow piano and cello for environmental loss.' },

    // Level 2: AI Art
    { filename: 'L2_T1.mp3', prompt: 'Sophisticated abstract electronic ambient with glitchy piano.' },
    { filename: 'L2_T2.mp3', prompt: 'Fast-paced artistic techno, chaotic glitches, high energy.' },
    { filename: 'L2_T3.mp3', prompt: 'Melancholic electronic drone with a single soulful violin.' },

    // Level 3: Genetics
    { filename: 'L3_T1.mp3', prompt: 'Sterile laboratory ambiance with scientific ticking and soft synths.' },
    { filename: 'L3_T2.mp3', prompt: 'Pulsating medical emergency synthwave, urgent and fast.' },
    { filename: 'L3_T3.mp3', prompt: 'Sad emotional orchestral piece, focus on soft strings and organ.' },

    // Level 4: Justice
    { filename: 'L4_T1.mp3', prompt: 'Gritty noir jazz with electronic bass, rain-soaked city atmosphere.' },
    { filename: 'L4_T2.mp3', prompt: 'Aggressive cyberpunk pursuit music, heavy drums and bass.' },
    { filename: 'L4_T3.mp3', prompt: 'Somber dark ambient for reflecting on difficult judicial choices.' },

    // Level 5: Medical Shortage
    { filename: 'L5_T1.mp3', prompt: 'Tense hospital background with steady heartbeat rhythm and soft pads.' },
    { filename: 'L5_T2.mp3', prompt: 'Frantic high-intensity electronic music with alarm-like synthetic echoes.' },
    { filename: 'L5_T3.mp3', prompt: 'Sorrowful funeral-like piano with distant operatic elements.' },

    // Level 6: Mars
    { filename: 'L6_T1.mp3', prompt: 'Epic sci-fi exploration track, vast soundstage with industrial cues.' },
    { filename: 'L6_T2.mp3', prompt: 'Driving cinematic Mars colony music, mechanical and powerful.' },
    { filename: 'L6_T3.mp3', prompt: 'Lonely space isolation ambient, deep subsonic drones and echoes.' },

    // Level 7: Automation
    { filename: 'L7_T1.mp3', prompt: 'Mechanical factory rhythm, systematic industrial techno.' },
    { filename: 'L7_T2.mp3', prompt: 'Chaotic revolution music, clashing metal and fast electronic beats.' },
    { filename: 'L7_T3.mp3', prompt: 'Cold industrial sadness, repetitive and hollow electronic melody.' },

    // Level 8: Censorship
    { filename: 'L8_T1.mp3', prompt: 'Unsettling corporate peace, smooth but slightly distorted ambient.' },
    { filename: 'L8_T2.mp3', prompt: 'Tense information warfare track, rapid percussion and static noise.' },
    { filename: 'L8_T3.mp3', prompt: 'Muted, suppressed melody struggling against digital white noise.' },

    // Level 9: Tourism
    { filename: 'L9_T1.mp3', prompt: 'Corrupted tropical calypso, sounding unnatural and slightly decayed.' },
    { filename: 'L9_T2.mp3', prompt: 'Overwhelming festival chaos, mixed genres and loud electronic noise.' },
    { filename: 'L9_T3.mp3', prompt: 'Tragic shore ambient, sounds of dying nature mixed with beach music.' },

    // Level 10: Immortality
    { filename: 'L10_T1.mp3', prompt: 'Transcendent digital choir, ethereal and light electronic pads.' },
    { filename: 'L10_T2.mp3', prompt: 'Infinite loop of fast-paced electronic ascension music.' },
    { filename: 'L10_T3.mp3', prompt: 'Ghostly, hollow ambient track for the digital afterlife.' }
];

const sfxTracks = [
    { filename: 'sfx_click.mp3', prompt: 'Natural UI click sound.' },
    { filename: 'sfx_hover.mp3', prompt: 'Soft electronic interface hover.' },
    { filename: 'sfx_error.mp3', prompt: 'Deep digital error thud.' },
    { filename: 'sfx_dialog_next.mp3', prompt: 'Pixel art text progression sound.' },
    { filename: 'sfx_footstep.mp3', prompt: 'Metallic boot step in sci-fi hall.' },
    { filename: 'mg_start.mp3', prompt: 'Electronic hacker start signal.' },
    { filename: 'mg_win.mp3', prompt: 'Triumphant 8-bit win fanfare.' },
    { filename: 'mg_lose.mp3', prompt: 'Glitchy digital failure sound.' },
    { filename: 'mg_tick.mp3', prompt: 'Tense rapid ticking.' }
];

async function generateMusicTrack(item) {
    console.log(`🎵 [Music] generating: ${item.filename} (3min)`);
    return new Promise((resolve, reject) => {
        const body = JSON.stringify({
            prompt: item.prompt,
            music_length_ms: 180000 // 3 minutes
        });

        const req = https.request({
            hostname: 'api.elevenlabs.io',
            path: '/v1/music',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': API_KEY,
                'Content-Length': Buffer.byteLength(body)
            }
        }, (res) => {
            if (res.statusCode !== 200) {
                let errData = '';
                res.on('data', d => errData += d);
                res.on('end', () => reject(new Error(`API Error ${res.statusCode}: ${errData}`)));
                return;
            }
            const file = fs.createWriteStream(path.join(ASSETS_DIR, item.filename));
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`✅ Saved: ${item.filename}`);
                resolve();
            });
        });

        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

// Keeping the Sound Effects API for SFX
const { ElevenLabsClient } = require('elevenlabs');
const client = new ElevenLabsClient({ apiKey: API_KEY });

async function generateSFXTrack(item) {
    console.log(`🔊 [SFX] generating: ${item.filename}`);
    try {
        const stream = await client.textToSoundEffects.convert({ text: item.prompt });
        const filePath = path.join(ASSETS_DIR, item.filename);
        const chunks = [];
        for await (const chunk of stream) chunks.push(chunk);
        fs.writeFileSync(filePath, Buffer.concat(chunks));
        console.log(`✅ Saved: ${item.filename}`);
    } catch (e) {
        console.error(`❌ SFX Error: ${item.filename}`, e.message);
    }
}

async function main() {
    console.log("🚀 STARTING FULL AUDIO RE-GENERATION\n");

    console.log("--- Phase 1: SFX ---");
    for (const sfx of sfxTracks) {
        await generateSFXTrack(sfx);
    }

    console.log("\n--- Phase 2: Music (10 Levels x 3 Tracks = 30 files, 3 min each) ---");
    for (const music of musicTracks) {
        await generateMusicTrack(music);
    }

    console.log("\n🎉 ALL AUDIO READY!");
}

main().catch(console.error);
