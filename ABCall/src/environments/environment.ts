export const environment = {
  production: false,
  cognito: {
    userPoolId: 'us-east-1_YDIpg1HiU',  // Cognito User Pool ID
    userPoolWebClientId: '65sbvtotc1hssqecgusj1p3f9g',  // Cognito App Client ID
    region: 'us-east-1'  // Cognito Region

  },

  apiPqrs: 'https://yxdz3rfzj3.execute-api.us-east-1.amazonaws.com/api/pqrs',
  apiPqrStats: 'https://yxdz3rfzj3.execute-api.us-east-1.amazonaws.com/api/pqrs/stats',

  /**apis for users**/
  apiClientsUrl2: 'https://l36oyb6gwa.execute-api.us-east-1.amazonaws.com/api/clients/short',// creacion de usurio sin autorization
  apiUsersUrl2: 'https://1acgpw2vfg.execute-api.us-east-1.amazonaws.com/api/user/register',
  apiGetUsersForClient:'https://1acgpw2vfg.execute-api.us-east-1.amazonaws.com/api/users/1',
  apiGetUserinfo:'https://1acgpw2vfg.execute-api.us-east-1.amazonaws.com/api/users?id_number=',
  apiGetUsersSub:'https://1acgpw2vfg.execute-api.us-east-1.amazonaws.com/api/user/',
  /**apis knowledgebase**/
  apiFilterArticles: 'https://gpe0e6wgv6.execute-api.us-east-1.amazonaws.com/api/knowledgebase/filters',
  apiFlows: 'https://gpe0e6wgv6.execute-api.us-east-1.amazonaws.com/api/knowledgebase/flow',
  apiTags: 'https://gpe0e6wgv6.execute-api.us-east-1.amazonaws.com/api/knowledgebase/tags',
  apiriskEvaluationBase:'https://gpe0e6wgv6.execute-api.us-east-1.amazonaws.com/api/knowledgebase/risk-evaluation/',
  /**API for Clients */
  apiClients: 'https://l36oyb6gwa.execute-api.us-east-1.amazonaws.com/api/client'
};


