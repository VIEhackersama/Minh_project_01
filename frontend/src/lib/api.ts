import { getGlobalToken, setGlobalToken } from "./token";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...restOptions } = options;

  let url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        searchParams.append(key, String(val));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = getGlobalToken();
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const mergedHeaders = new Headers({
    ...defaultHeaders,
    ...headers,
  });

  const response = await fetch(url, {
    ...restOptions,
    credentials: "include",
    headers: mergedHeaders,
  });

  // Handle Unauthorized (401) - Attempt Auto Token Refresh
  if (response.status === 401 && path !== "/auth/login" && path !== "/auth/refresh") {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          const newAccessToken = refreshData.accessToken;
          
          setGlobalToken(newAccessToken);
          isRefreshing = false;
          onRefreshed(newAccessToken);
        } else {
          isRefreshing = false;
          setGlobalToken(null);
          throw new Error("Session expired");
        }
      } catch (err) {
        isRefreshing = false;
        setGlobalToken(null);
        throw err;
      }
    }

    return new Promise<T>((resolve, reject) => {
      subscribeTokenRefresh((newToken) => {
        const retryHeaders = new Headers(mergedHeaders);
        retryHeaders.set("Authorization", `Bearer ${newToken}`);
        
        fetch(url, {
          ...restOptions,
          credentials: "include",
          headers: retryHeaders,
        })
          .then((res) => {
            if (!res.ok) {
              return res.json().then(
                (errData) => reject(new Error(errData?.message || errData?.error || `Retry failed with status ${res.status}`)),
                () => reject(new Error(`Retry failed with status ${res.status}`))
              );
            }
            if (res.status === 204) {
              resolve({} as T);
            } else {
              resolve(res.json() as Promise<T>);
            }
          })
          .catch(reject);
      });
    });
  }

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: `HTTP error! Status: ${response.status}` };
    }
    throw new Error(errorData?.message || errorData?.error || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) => 
    request<T>(path, { ...options, method: "GET" }),
    
  post: <T>(path: string, body?: unknown, options?: RequestOptions) => 
    request<T>(path, { 
      ...options, 
      method: "POST", 
      body: body ? JSON.stringify(body) : undefined 
    }),
    
  put: <T>(path: string, body?: unknown, options?: RequestOptions) => 
    request<T>(path, { 
      ...options, 
      method: "PUT", 
      body: body ? JSON.stringify(body) : undefined 
    }),
    
  delete: <T>(path: string, options?: RequestOptions) => 
    request<T>(path, { ...options, method: "DELETE" }),

  upload: async <T>(path: string, formData: FormData): Promise<T> => {
    const token = getGlobalToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers,
      body: formData,
    });
    if (!response.ok) {
      let errData;
      try {
        errData = await response.json();
      } catch {
        errData = { message: `Upload failed with status ${response.status}` };
      }
      throw new Error(errData?.message || "Upload failed");
    }
    return response.json() as Promise<T>;
  },
};
