// src/utils/cookieUtils.js

/**
 * Create or update a cookie
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {number} days - Optional. Number of days until the cookie expires.
 */
export const setCookie = (name, value, days = 7) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = `${name}=${encodeURIComponent(
        value
    )}; expires=${expires}; path=/`
}

/**
 * Read a cookie value by name
 * @param {string} name - The name of the cookie to read.
 * @returns {string|null} - The value of the cookie, or null if not found.
 */
export const getCookie = (name) => {
    return (
        document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${name}=`))
            ?.split('=')[1] || null
    )
}

/**
 * Update a cookie value
 * @param {string} name - The name of the cookie.
 * @param {string} value - The new value of the cookie.
 * @param {number} days - Optional. Number of days until the cookie expires.
 */
export const updateCookie = (name, value, days = 7) => {
    setCookie(name, value, days) // Simply overwrite with setCookie
}

/**
 * Delete a cookie by name
 * @param {string} name - The name of the cookie to delete.
 */
export const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}
