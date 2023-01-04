import { encode as base64encode } from 'base64-arraybuffer';

export class CodeChallengeUtil {
  static generate(): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode((Math.random() + 1).toString(36).substring(7));
    return window.crypto.subtle.digest('SHA-256', data).then((digest) => {
      const base64Digest = base64encode(digest);
      // you can extract this replacing code to a function
      return base64Digest.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    });
  }
}
