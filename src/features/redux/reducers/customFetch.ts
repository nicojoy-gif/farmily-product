async function fetchWithTimeout(resource: RequestInfo, options = {}) {
    let timeout: any = 5000;
    if ("timeout" in options) {
      timeout = options.timeout
    }
    //else{
    //options['timeout'] = timeout;
    //}
  
    const abortController = new AbortController();
    const id = setTimeout(() => abortController.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: abortController.signal
    });
    clearTimeout(id);
    return response;
  }
  export default fetchWithTimeout;