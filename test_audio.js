require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { ElevenLabsClient } = require('elevenlabs');

const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });
const ASSETS_DIR = path.join(__dirname, 'assets', 'audio');

if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

async function testSFX() {
    console.log("🛠️ Test de l'API ElevenLabs (Génération d'un Bruitage de test)...");
    try {
        const audioStream = await client.textToSoundEffects.convert({
            text: "A short futuristic interface beep, high pitched",
        });

        const filePath = path.join(ASSETS_DIR, 'test_beep.mp3');
        const writeStream = fs.createWriteStream(filePath);
        audioStream.pipe(writeStream);

        writeStream.on('finish', () => {
            console.log(`✅ Succès ! Bruitage de test généré : ${filePath}`);
        });

        writeStream.on('error', (err) => {
            console.error(`❌ Erreur d'écriture de fichier :`, err);
        });
    } catch (e) {
        if (e.statusCode === 402) {
            console.error("❌ Erreur 402: Paiement requis. La génération Sound Effects requiert un abonnement Creator ou des crédits suffisants.");
        } else if (e.statusCode === 401) {
            console.error("❌ Erreur 401: Clé API invalide. Vérifiez que la clé commence bien par sk_...");
        } else if (e.statusCode === 403) {
            console.error("❌ Erreur 403: Accès interdit. Vérifiez les permissions de la clé API.");
        } else {
            console.error("❌ Erreur API Inconnue :", e.message, e);
        }
    }
}

testSFX();
