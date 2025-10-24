import requests
import base64
import logging

def basic_auth_request(url, username, password):
    credentials = f"{username}:{password}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode()
    headers = {
        "Authorization": f"Basic {encoded_credentials}"
    }
    response = requests.get(url, headers=headers)
    return response

def get_jwt_token(token_url, username, password, client_id=None, client_secret=None, grant_type="password", timeout=10):
    payload = {
        "grant_type": grant_type,
        "username": username,
        "password": password,
    }
    if client_id:
        payload["client_id"] = client_id
    if client_secret:
        payload["client_secret"] = client_secret
    
    try:
        resp = requests.post(token_url, data=payload, timeout=timeout)
        resp.raise_for_status()
        data = resp.json()
        token = data.get("access_token") or data.get("token") or data.get("jwt")
        if not token:
            #raise ValueError("No token found in token endpoint response: %r" % body)
            raise ValueError(f"No token in response: {data}")
        return token
    except requests.exceptions.RequestException as e:
        logging.error(f"Request failed: {e}")
        raise

def jwt_request(method, url, token, headers=None, timeout=10, **kwargs):
    if headers is None:
        headers = {}
    headers = dict(headers) 
    headers["Authorization"] = f"Bearer {token}"
    return requests.request(method, url, headers=headers, timeout=timeout, **kwargs)
