import otsimo from 'otsimo';
/**
 * TTSManager handles tts actions
 *
 * @export
 * @class TTSManager
 */
export default class TTSManager {
  setVoiceDriver(id) {
    if (otsimo.isWKWebView) {
      otsimo.tts.setVoice(id);
    } else if (otsimo.android) {
      const vl = otsimo.tts.voiceList();
      for (const v of vl) {
        const lang = v.language.split('-')[0];
        if (lang === otsimo.child.language) {
          otsimo.tts.setVoice(v.id);
          break;
        }
      }
    } else {
      const responsiveVoiceDriver = new ResponsiveVoiceDriver();
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
      // responsiveVoice.speak(text);
    }
  }

  setVoice(voice) {
    if (responsiveVoice) {
      // responsiveVoice.setDefaultVoice(voice);
    }
  }

  getVoice() {
    return '';
  }

  voiceList() {
    return [];
  }
}
