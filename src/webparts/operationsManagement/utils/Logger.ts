// Logger utility for KPFA Operations Management

export class Logger {
  private static isDevelopment = DEBUG;

  public static log(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.log(`[KPFA Operations] ${message}`, data || '');
    }
  }

  public static warn(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.warn(`[KPFA Operations] ${message}`, data || '');
    }
  }

  public static error(message: string, error?: unknown): void {
    console.error(`[KPFA Operations] ${message}`, error || '');
  }

  public static info(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.info(`[KPFA Operations] ${message}`, data || '');
    }
  }
}
