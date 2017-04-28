/**
 * TTSManager handles tts actions
 *
 * @export
 * @class TTSManager
 */
export default class TTSManager {
    setVoiceDriver(id) {
            if (otsimo.isWKWebView || otsimo.android) {
                otsimo.tts.setVoice(id);
            } else {
                let responsiveVoiceDriver = new ResponsiveVoiceDriver();
                otsimo.tts.setDriver(responsiveVoiceDriver);
                if (otsimo.child.language === 'tr') {
                    otsimo.tts.setVoice('Turkish Female');
                } else if (otsimo.child.language === 'en') {
                    otsimo.tts.setVoice('US English Female');
                } else {
                    console.log('This language for development is not recognized.');
                }
            }
        }
        /**
         * speak
         * @param {string} text2Speak the text to speak
         */
    speak(text2Speak) {
        otsimo.tts.speak(text2Speak);
    }
}

/**
 * Dummy voice driver for development, using responsivevoice.com api.
 *
 * @export
 * @class ResponsiveVoiceDriver
 */
class ResponsiveVoiceDriver {
    speak(text) {
        if (responsiveVoice) {
            //responsiveVoice.speak(text);
        }
    }

    setVoice(voice) {
        if (responsiveVoice) {
            //responsiveVoice.setDefaultVoice(voice);
        }
    }

    getVoice() {
        return ''
    }

    voiceList() {
        return [];
    }
}
