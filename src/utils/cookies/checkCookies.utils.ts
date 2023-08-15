import fs from "fs";
import { Protocol } from "puppeteer";

export const checkCookies = (
  cookies: Protocol.Network.Cookie[],
  searchFor: string
): { isWritten: boolean; isIntercepted: boolean } => {
  let isWritten: boolean;
  let isIntercepted: boolean;

  // not intercepted not written => skip / intercepted not written => write / intercepted written => write and set / not intercepted written => set
  // if written set if intercepted write

  // Check if the cookie intercepted is of an authenticated account
  const interceptedAuthCookie = cookies.filter(
    (cookie: Protocol.Network.Cookie) => cookie.name == searchFor
  );
  isIntercepted = interceptedAuthCookie.length === 0 ? false : true;

  // Check if the cookie is written to the file, and if it is check if it is a cookie of an authenticated account
  let cookiesStr = fs.readFileSync("./cookies.json", "utf8");
  if (cookiesStr.length === 0) {
    isWritten = false;
    return { isWritten, isIntercepted };
  } else if (cookiesStr.length !== 0) {
    let cookies = JSON.parse(cookiesStr);
    const writtenAuthCookie = cookies.filter(
      (cookie: Protocol.Network.Cookie) => cookie.name == searchFor
    );
    if (writtenAuthCookie) {
      isWritten = true;
      return { isWritten, isIntercepted };
    } else if (!writtenAuthCookie) {
      isWritten = false;
      return { isWritten, isIntercepted };
    }
  }

  return { isWritten: false, isIntercepted };
};
