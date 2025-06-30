import { useState, useEffect } from 'react';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(decodeURIComponent(atob(base64).split('').map(c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join('')));
    return payload;
  } catch (err) {
    console.error('Failed to parse JWT:', err);
    return null;
  }
};

export default function useCookie(name) {
  const [cookieValue, setCookieValue] = useState(() => getCookie(name));
  const [decodedJwt, setDecodedJwt] = useState(() => parseJwt(cookieValue));

  useEffect(() => {
    const interval = setInterval(() => {
      const current = getCookie(name);
      setCookieValue(prev => {
        if (prev !== current) {
          setDecodedJwt(parseJwt(current));
          return current;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [name]);

  return { token: cookieValue, decoded: decodedJwt };
}
