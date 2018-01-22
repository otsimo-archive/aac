import otsimo from "otsimo";
/**
 * TTSManager handles tts actions
 *
 * @export
 * @class TTSManager
 */
export default class TTSManager {
  setVoiceDriver(id) {
    if (!otsimo.isWKWebView && !otsimo.android) {
      const vd = new DummmyVoiceDriver();
      otsimo.tts.setDriver(vd);
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
 * @class DummmyVoiceDriver
 */
class DummmyVoiceDriver {
  speak(text) {
    console.log("speak", text);
  }

  setVoice(voice) {
    console.log("setVoice", voice);
  }

  getVoice() {
    return "";
  }

  voiceList() {
    return [];
  }
}
