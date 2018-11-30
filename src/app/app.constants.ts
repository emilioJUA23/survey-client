import{ SHA256} from 'crypto-js/sha256';

export class AppConstants {
    public static get baseURL(): string { return "http://186.151.197.22/api/api/v1"; }

    public static get pageLength(): number { return 10;}
}
