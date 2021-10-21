//推荐用 axios
export const getBannerList = (dispatch, getState) => {
  fetch(
    "https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=2&k=1294003",
    {
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"157103968421049634718691","bc":"440300"}',
        "X-Host": "mall.film-ticket.film.list"
      }
    }
  )
    .then(response => response.json())
    .then(res => {
      console.log(res);
      dispatch({
        type: "FILM_SET_BANNER",
        payload: res.data.films
      });
    });
};

export const changeName = (dispatch, getState) => {
  dispatch({
    type: "FILM_CHANGE_NAME",
    payload: "李四"
  });
};
