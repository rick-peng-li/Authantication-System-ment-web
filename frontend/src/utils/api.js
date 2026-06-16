const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export const apiRequest = async (path, options = {}) => {
  const { body, headers, ...restOptions } = options
  const requestOptions = {
    credentials: "include",
    headers: {
      ...headers,
    },
    ...restOptions,
  }

  if (body !== undefined) {
    requestOptions.body = body instanceof FormData ? body : JSON.stringify(body)

    if (!(body instanceof FormData)) {
      requestOptions.headers = {
        "Content-Type": "application/json",
        ...requestOptions.headers,
      }
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, requestOptions)
  const contentType = response.headers.get("content-type") || ""
  const payload = contentType.includes("application/json") ? await response.json() : null

  if (!response.ok) {
    throw new Error(payload?.message || "请求失败")
  }

  return payload
}
