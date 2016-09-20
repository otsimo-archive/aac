interface Child {
    firstname: string;
    lastname: string;
    language: string;
}

interface Settings {
    show_hint: boolean;
    hint_duration: number;
}

interface Asset {
    name: string;
    path: string;
    type: string;
}

interface OtsimoGame {
    session_step: number;
    balloon_options: any;
}

interface KeyValue {
}

interface Manifest {
    unique_name: string;
    version: string;
}

interface TTSDriver {
    speak(text: string): void;

    setVoice(text: string): void;

    getVoice(): string;

    voiceList(): Array<string>;
}

interface TTS {
    speak(text: string): void;

    setVoice(text: string): void;

    getVoice(): string;

    voiceList(): Array<string>;

    setDriver(driver: TTSDriver): void;

    getDriver(): string;
}

declare namespace otsimo {
    let debug: boolean;
    let sound: boolean;
    let child: Child;
    let width: number;
    let height: number;
    let settings: Settings;
    let iOS: boolean;
    let manifest: Manifest;
    let kv: KeyValue;
    let tts: TTS;

    function quitgame(): void;

    function customevent(event: string, payload: Object): void;

    function log(str: string): void;

    function init(): void;

    function run(callback: Function): void;

    function onSettingsChanged(callback: Function): void;

    function saveLocalSettings(data: any): void;
    /**
     * Loads local settings from remote or local browser
     * @param callback Callback Function which returns (err,data)
     */
    function loadLocalSettings(callback: Function): void;


}

declare module "otsimo" {
    export = otsimo;
}
