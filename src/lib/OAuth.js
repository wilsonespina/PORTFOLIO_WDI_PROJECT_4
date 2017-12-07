import queryString from 'query-string';

class OAuth {
  static providers = [{
    name: 'strava',
    url: '/api/oauth/strava',
    authEndpoint: 'https://strava.com/oauth/authorize',
    clientId: '21848'
  }];

  static getAuthLink(provider) {
    const qs = {
      client_id: provider.clientId,
      redirect_uri: window.location.origin + window.location.pathname,
      response_type: 'code'
    };

    return `${provider.authEndpoint}?${queryString.stringify(qs)}`;
  }

  static getProvider(providerName) {
    const provider = this.providers.find(provider => provider.name === providerName);
    provider.authLink = this.getAuthLink(provider);
    return provider;
  }
}

export default OAuth;
