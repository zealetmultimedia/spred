export function customHeaders(token: any) {
  return {
    mobileAppByPassIVAndKey: 'a0092a148a0d69715268df9f5bb63b24fca27d344f54df9b',
    username: 'SpredMediaAdmin',
    password: 'SpredMediaLoveSpreding@2023',
    Authorization: `Bearer ${token}`,
  };
}
