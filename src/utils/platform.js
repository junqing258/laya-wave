export function checkLogin() {
  return GM && GM.userLogged;
}

export function toLogin() {
  if (GM && GM.userLoginUrl) {
    return (location.href = GM.userLoginUrl);
  }
}
export function getUserId() {
  if (checkLogin() && GM) return GM.user_id || GM.userId;
  return null;
}

export function appGoback() {
  if (GM && GM.isShowBtnBack_out) {
    return (location.href = gamehallAndroidBackUrl);
  } else {
    history.go(-1);
  }
}