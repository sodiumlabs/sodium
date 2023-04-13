

let debug = false;

export const Logger = {
  debug: (msg: string | object) => {
    if (debug) {
      console.log(`[DEBUG] ${JSON.stringify(msg)}`);
    }
  }
}