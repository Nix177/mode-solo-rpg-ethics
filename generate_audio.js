require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { ElevenLabsClient } = require('elevenlabs');

const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });
const ASSETS_DIR = path.join(__dirname, 'assets', 'audio');

if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// ---------------------------------------------------------
// 1. SOUND EFFECTS (SFX) TO GENERATE
// ---------------------------------------------------------
const sfxToGenerate = [
    // UI & System
    { filename: 'sfx_click.mp3', prompt: 'A satisfying, clean, modern digital tick for a UI menu click.' },
    { filename: 'sfx_hover.mp3', prompt: 'A very subtle, soft futuristic electronic blip.' },
    { filename: 'sfx_error.mp3', prompt: 'A low, dull digital thud indicating an error or locked access.' },
    { filename: 'sfx_dialog_next.mp3', prompt: 'A soft pixelated text box progression sound.' },

    // Action & Minigames
    { filename: 'sfx_footstep.mp3', prompt: 'A distinct sci-fi boot footstep on a metallic grate.' },
    { filename: 'mg_start.mp3', prompt: 'A sudden electronic alarm chirp indicating a system breach.' },
    { filename: 'mg_win.mp3', prompt: 'A fast, triumphant 8-bit synthetic melody for hacking success.' },
    { filename: 'mg_lose.mp3', prompt: 'A descending, glitchy digital fail sound.' },
    { filename: 'mg_tick.mp3', prompt: 'A fast, tense digital ticking clock.' }
];

async function generateSFX(item) {
    console.log(`🎵 Génération du SFX : ${item.filename}...`);
    try {
        const audioStream = await client.textToSoundEffects.convert({
            text: item.prompt,
        });

        const filePath = path.join(ASSETS_DIR, item.filename);

        // Convert Web ReadableStream to an array of buffers
        const chunks = [];
        for await (const chunk of audioStream) {
            chunks.push(chunk);
        }
        fs.writeFileSync(filePath, Buffer.concat(chunks));
        console.log(`✅ SFX sauvegardé : ${filePath}`);

    } catch (error) {
        console.error(`❌ Erreur SFX ${item.filename}:`, error.message);
    }
}

async function main() {
    console.log("🚀 Démarrage de la génération de BRUITAGES (SFX)...\n");

    for (const sfx of sfxToGenerate) {
        await generateSFX(sfx);
    }

    console.log("\n🎉 Génération des SFX terminée ! Vérifiez le dossier assets/audio/");
}

main();
