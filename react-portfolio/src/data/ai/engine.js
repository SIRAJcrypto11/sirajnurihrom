import { profileKnowledge } from './knowledge/profile';
import { snishopKnowledge } from './knowledge/snishop';
import { projectsErpKnowledge } from './knowledge/projects_erp';
import { projectsAiKnowledge } from './knowledge/projects_ai';
import { projectsCommerceKnowledge } from './knowledge/projects_commerce';
import { projectsEduKnowledge } from './knowledge/projects_edu';

// 1. Array Agregasi Raksasa (Menampung seluruh file knowledge base)
// Ini adalah "Otak Besar" dari AI. Jika ada modul bari di-inject ke array ini.
export const KNOWLEDGE_VAULT = [
    ...profileKnowledge,
    ...snishopKnowledge,
    ...projectsErpKnowledge,
    ...projectsAiKnowledge,
    ...projectsCommerceKnowledge,
    ...projectsEduKnowledge,
    // Add General Greetings
    {
        intent: 'greeting',
        keywords: { 'halo': 5, 'hallo': 5, 'helo': 5, 'alo': 4, 'hai': 5, 'hy': 5, 'hello': 5, 'hi': 5, 'hey': 5, 'pagi': 4, 'siang': 4, 'sore': 4, 'malam': 4, 'test': 4, 'ping': 4, 'assalamualaikum': 6, 'samlekom': 5 },
        response: `Halo. Anda sedang berkomunikasi dengan Siraj Engine V8.2, sebuah agen AI yang beroperasi sepenuhnya secara luring di perangkat Anda.\n\nDatabase saya menampung volume data ekstrim terkait profil Siraj Nur Ihrom dan konfigurasi arsitektur dari 20+ aplikasi di ekosistem SNISHOP.COM (seperti ERP dan BudgyAI).\n\nDeteksi masukan bahasa aktif. Silakan ajukan bahasa alami yang cukup kompleks, sistem saya akan mencoba memastikan akurasi konteks tinggi.`
    },
    // Fallback if they say thanks
    {
        intent: 'gratitude',
        keywords: { 'terima': 4, 'kasih': 4, 'makasih': 5, 'thanks': 5, 'thank': 5, 'tengkyu': 5, 'sip': 3, 'oke': 3, 'mantap': 4, 'keren': 4, 'cool': 4, 'awesome': 4 },
        response: `Sama-sama. Apakah ada hal lain tentang arsitektur atau sistem yang dibangun oleh Siraj yang ingin Anda telusuri lebih jauh?`
    }
];

// 2. Mesin NLP Offline (SuperSmart Scoring Engine)
/**
 * Ini bukan regex biasa. Ini adalah Multi-Pass Scoring Loop.
 * 1. Tokenisasi (Pecah kalimat jadi kata)
 * 2. Pembersihan Stop-words (kata hubung yang bikin bias)
 * 3. Pembobotan kata (mengecek bobot kata di database)
 * 4. Contextual Bonus Phrase Matching (Jika ada frase persis, bonus 15 poin)
 */
export const masterEngineProcessor = (inputQuery) => {
    // A. Pre-Processing (Sanitization)
    const rawQuery = inputQuery.toLowerCase().trim();
    // Hilangkan karakter non-alfanumerik agar tidak merusak token
    const cleanQuery = rawQuery.replace(/[^a-z0-9\s]/g, '');
    let tokens = cleanQuery.split(/\s+/);

    // Stop Words Bias Filter (Kata-kata ini diabaikan agar fokus ke kata kunci krusial)
    const stopWords = ['yg', 'yang', 'dan', 'atau', 'di', 'ke', 'dari', 'itu', 'ini', 'adalah', 'untuk', 'saya', 'aku', 'pengen', 'mau', 'dong', 'sih', 'nya'];
    tokens = tokens.filter(t => !stopWords.includes(t) && t.length > 2); // Exclude stop words and tiny words (like 'a')

    let maxScore = 0;
    let winningIntent = null;

    // B. Matrix Kalkulasi Skor
    KNOWLEDGE_VAULT.forEach(kbNode => {
        let nodeScore = 0;

        // B.1 Loop Token (Base Weight Scoring)
        tokens.forEach(token => {
            // Jika token pengguna ada di dictionary keywords node ini, tambahkan bobot presisinya
            if (kbNode.keywords[token]) {
                nodeScore += kbNode.keywords[token];
            }
        });

        // B.2 Contextual Bonus Scoring (Toleransi Frase)
        // Kunci utamanya: Beri skor sangaaat besar (mendekati tak terhingga) untuk kata majemuk spesifik,
        // dan PENALTI intent generic jika ada kata spesifik.
        if (kbNode.intent === 'snishop_vision' && rawQuery.includes('apa itu snishop') && !rawQuery.includes('erp')) nodeScore += 20;
        if (kbNode.intent === 'snishop_vision' && rawQuery.includes('erp')) nodeScore -= 50; // Penalti keras jika user sebenarnya nanya ERP

        if (kbNode.intent === 'project_erp' && rawQuery.includes('snishop erp')) nodeScore += 50; // Bonus massive untuk kata majemuk
        if (kbNode.intent === 'project_erp' && rawQuery.includes('apa itu erp')) nodeScore += 50;

        if (kbNode.intent === 'project_budgyai' && rawQuery.includes('budgy')) nodeScore += 30;

        if (kbNode.intent === 'profile_speed_quality' && rawQuery.includes('singularity')) nodeScore += 30;
        if (kbNode.intent === 'profile_identity' && rawQuery.includes('siraj nur ihrom')) nodeScore += 30;
        if (kbNode.intent === 'profile_skills' && rawQuery.includes('tech stack')) nodeScore += 30;

        // B.3 Compare to Maximum
        if (nodeScore > maxScore) {
            maxScore = nodeScore;
            winningIntent = kbNode;
        }
    });

    // C. Evaluasi Ambang Batas (Thresholding Logic)
    // Jika maxScore < 4, berarti tebakan AI lemah/tidak akurat. Maka lebih baik melempar Fallback daripada halusinasi.
    if (maxScore >= 4 && winningIntent) {
        return winningIntent.response;
    }

    return null; // Mereturn null akan memicu render Fallback Response di komponen React
};
