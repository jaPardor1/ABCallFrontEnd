export const environment = {
  production: false,
  cognito: {
    userPoolId: 'us-east-1_YDIpg1HiU',  // Cognito User Pool ID
    userPoolWebClientId: '65sbvtotc1hssqecgusj1p3f9g',  // Cognito App Client ID
    region: 'us-east-1'  // Cognito Region

  },
  apiClientsUrl2: 'https://l36oyb6gwa.execute-api.us-east-1.amazonaws.com/api/clients/short',
  /**apis for users**/
  apiUsersUrl2: 'https://1acgpw2vfg.execute-api.us-east-1.amazonaws.com/api/user/register',
  apiGetUsersForClient:'https://1acgpw2vfg.execute-api.us-east-1.amazonaws.com/api/users/1',
  apiGetUsersSub:'https://1acgpw2vfg.execute-api.us-east-1.amazonaws.com/api/user/',

};


