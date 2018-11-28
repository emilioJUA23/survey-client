import{ SHA256} from 'crypto-js/sha256';

export class AppConstants {
    public static get baseURL(): string { return "http://35.224.77.125/api/v1"; }

    public static get pageLength(): number { return 10;}
}
