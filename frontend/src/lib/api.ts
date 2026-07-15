import { getGlobalToken, setGlobalToken } from "./token";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

// Global flag to track if we are currently refreshing the token to prevent parallel refreshes
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

  // Construct URL with query parameters if present
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

  // Set default headers
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Inject Bearer Token if available
  const token = getGlobalToken();
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  // Merge headers
  const mergedHeaders = new Headers({
    ...defaultHeaders,
    ...headers,
  });

  const response = await fetch(url, {
    ...restOptions,
    headers: mergedHeaders,
  });

  // Handle Unauthorized (401) - Attempt Auto Token Refresh
  if (response.status === 401 && path !== "/auth/login" && path !== "/auth/refresh") {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        // Attempt to refresh session (sends the httpOnly refreshToken cookie)
        const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
          method: "POST",
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

    // Wait for the token to be refreshed and retry the request
    return new Promise<T>((resolve, reject) => {
      subscribeTokenRefresh((newToken) => {
        const retryHeaders = new Headers(mergedHeaders);
        retryHeaders.set("Authorization", `Bearer ${newToken}`);
        
        fetch(url, {
          ...restOptions,
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

  // Handle empty responses
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
};
