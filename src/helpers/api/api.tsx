let baseURL = 'https://www.spred.cc/api';

export const api = {
  register: `${baseURL}/Authentication/UserAuthentication/register-user`,
  login: `${baseURL}/Authentication/UserAuthentication/login-user`,
  confirmEmail: `${baseURL}/Authentication/UserAuthentication/confirm-user-email`,
  resentOTP: `${baseURL}/Authentication/UserAuthentication/resend-user-otp`,
  forgotPassword: `${baseURL}/Authentication/UserAuthentication/forget-user-password`,
  resetPassword: `${baseURL}/Authentication/UserAuthentication/reset-user-password`,
  getAllMovies: `${baseURL}/Catalogue/Video/get-all-videos`,
  getAllCategories: `${baseURL}/Catalogue/Category/get-all-Categories`,
  fecthAccountBalance: `${baseURL}/Payment/Enquiry/get-accountBalance`,
  fetchVirtualAccount: `${baseURL}/Payment/Enquiry/get-users-virtualaccount-bywalletref`,
  getWalletDetails: `${baseURL}/Payment/Enquiry/get-wallet-byuserid`,
  downloadDebitWallet: `${baseURL}/ContentManager/Content/download-content`,
  getUserDetails: `${baseURL}/UserManagement/User`,
  getProfileId: `${baseURL}/UserManagement/Profile`,
  uploadImage: `${baseURL}/UserManagement/Image`,
};
