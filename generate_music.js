require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { ElevenLabsClient } = require('elevenlabs');

const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });
const ASSETS_DIR = path.join(__dirname, 'assets', 'audio');

if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// 20 new tracks to reach 3 tracks per level (10 levels total) Let's assume the previous ones were main themes.
const musicToGenerate = [
    // Level 1: Forest / Energy
    { filename: 'L1_Action.mp3', prompt: 'A fast-paced, tribal percussion track with electronic synthesizer elements, tense.' },
    { filename: 'L1_Sad.mp3', prompt: 'A melancholic ambient track with a slow, mournful flute and synth pads.' },

    // Level 2: AI Art
    { filename: 'L2_Main.mp3', prompt: 'A sophisticated, abstract electronic piece with classical piano influences.' },
    { filename: 'L2_Action.mp3', prompt: 'A chaotic, glitchy artistic techno track with rapid beats.' },
    { filename: 'L2_Sad.mp3', prompt: 'A solitary, haunting cello solo over subtle electronic drone.' },

    // Level 3: Genetics
    { filename: 'L3_Main.mp3', prompt: 'A sterile, precise ambient track with ticking rhythms and soft synthesizers.' },
    { filename: 'L3_Action.mp3', prompt: 'A fast, pulsating synthwave track indicating medical emergency.' },
    { filename: 'L3_Sad.mp3', prompt: 'A slow, emotional piano track with soft string accompaniment.' },

    // Level 4: Justice
    { filename: 'L4_Action.mp3', prompt: 'A heavy, dark cyberpunk synthwave track with aggressive basslines.' },
    { filename: 'L4_Sad.mp3', prompt: 'A gritty, moody neo-noir saxophone over a slow rain-like electronic beat.' },

    // Level 5: Medical Shortage
    { filename: 'L5_Main.mp3', prompt: 'A tense, slow-building ambient track with an irregular heartbeat rhythm.' },
    { filename: 'L5_Action.mp3', prompt: 'A frantic, high-BPM electronic track with sirens and alarm-like synths.' },
    { filename: 'L5_Sad.mp3', prompt: 'A deeply tragic and slow orchestral piece with a prominent violin.' },

    // Level 6: Mars Terraforming
    { filename: 'L6_Action.mp3', prompt: 'An epic, driving sci-fi orchestral track with industrial drums.' },
    { filename: 'L6_Sad.mp3', prompt: 'A vast, empty ambient space track with echoing synth swells.' },

    // Level 7: Automation
    { filename: 'L7_Action.mp3', prompt: 'A rhythmic, mechanical industrial techno track with factory sounds.' },
    { filename: 'L7_Sad.mp3', prompt: 'A sad, repetitive electronic melody depicting loneliness and obsolescence.' },

    // Level 8: Censorship
    { filename: 'L8_Main.mp3', prompt: 'A clean, slightly unnerving corporate ambient track, very peaceful but sinister.' },
    { filename: 'L8_Action.mp3', prompt: 'An intense, fast thriller track with ticking elements and deep bass drops.' },
    { filename: 'L8_Sad.mp3', prompt: 'A muffled, muted piano melody trying to break through static noise.' },

    // Level 9: Tourism
    { filename: 'L9_Main.mp3', prompt: 'A deceptively cheerful tropical music track with subtle unnatural synth elements.' },
    { filename: 'L9_Action.mp3', prompt: 'A chaotic, overwhelming mix of carnival music and heavy electronic beats.' },
    { filename: 'L9_Sad.mp3', prompt: 'A slow, corrupted calypso track, sounding degraded and sad.' },

    // Level 10: Immortality
    { filename: 'L10_Action.mp3', prompt: 'A high-energy, transcendent electronic trance track.' },
    { filename: 'L10_Sad.mp3', prompt: 'A profound, ethereal ambient track featuring a distant, ghostly choir.' }
];

async function generateMusic(item) {
    console.log(`🎵 Génération de MUSIQUE : ${item.filename}...`);
    try {
        const audioStream = await client.textToSoundEffects.convert({
            text: item.prompt + " Full length instrumental music.",
        });

        const filePath = path.join(ASSETS_DIR, item.filename);
        const chunks = [];
        for await (const chunk of audioStream) {
            chunks.push(chunk);
        }
        fs.writeFileSync(filePath, Buffer.concat(chunks));
        console.log(`✅ Musique sauvegardée : ${filePath}`);

    } catch (error) {
        console.error(`❌ Erreur MUSIQUE ${item.filename}:`, error.message);
    }
}

async function main() {
    console.log("🚀 Démarrage de la génération des musiques restantes...\n");
    for (const music of musicToGenerate) {
        await generateMusic(music);
    }
    console.log("\n🎉 Génération des Musiques terminée ! Vérifiez le dossier assets/audio/");
}

main();
