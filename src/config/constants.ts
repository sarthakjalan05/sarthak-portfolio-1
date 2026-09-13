/**
 * @file constants.ts
 * Global application constants and configuration.
 */

/**
 * RESUME_VERSION: Cache-busting query parameter for the resume PDF.
 *
 * NOTE FOR FUTURE UPDATES:
 * Whenever you replace the PDF file at `/public/resume/Sarthak_Jalan_Resume.pdf`,
 * bump this version constant (e.g., '1.0.1', '1.1.0', etc.).
 * This appends a `?v=` query parameter to the download URL so that returning
 * visitors and hiring managers always receive the latest version rather than
 * a stale cached copy from their browser.
 */
export const RESUME_VERSION = '1.0.0';

/**
 * Direct public path to the static resume PDF with cache-busting query string.
 * Uses static public URL directly (not a bundled asset or base64) so replacing
 * the file at `/public/resume/Sarthak_Jalan_Resume.pdf` works seamlessly.
 */
export const RESUME_PATH = `/resume/Sarthak_Jalan_Resume.pdf?v=${RESUME_VERSION}`;

export const RESUME_FILENAME = 'Sarthak_Jalan_Resume.pdf';
